import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";
import lodash from "lodash";
import { v4 as uuid } from "uuid";

import { matchPrompts } from "~/assets/text/match-prompts.js";
import {
  ACHIEVEMENTS_TO_STORE,
  CHAT_TIME_MS,
  POINTS_ACHIEVEMENTS,
  POINTS_BOT_BUSTED,
  POINTS_HUMAN_BUSTED,
  VOTING_TIME_MS,
} from "~/constants/index.js";
import { ee, matchEvent } from "~/server/api/match-maker.js";
import { type BBPgTransaction } from "~/server/db/index.js";
import {
  userAchievements,
  users,
  type UserAchievements,
} from "~/server/db/schema.js";
import {
  selectMatchPlayedByUser,
  selectUserAchievements,
  selectUserById,
} from "~/server/db/user.js";
import { matchAchievements } from "~/server/service/achievements.js";
import { Agent } from "~/server/service/index.js";
import {
  achievementIdSchema,
  type CharacterId,
  type ChatMessagePayload,
  type MatchRoom,
  type MatchStage,
  type PlayerType,
  type ReadyToPlayPayload,
  type StoredChatMessage,
} from "~/types/index.js";
import { getRandomInt } from "~/utils/math.js";

export class Match {
  private _id: string;
  private _messages: ChatMessagePayload[] = [];
  private _createdAt = Date.now(); // unix timestamp
  private _votingAt = Date.now() + CHAT_TIME_MS; // unix timestamp
  private _availableCharacterIds: CharacterId[] = lodash.shuffle([
    "1",
    "2",
    "3",
    "4",
    "5",
  ]);
  private _players: PlayerType[];
  private _agents: Agent[];
  private _messageCountSinceLastTrigger = 0;
  private _isInitialized = false;
  private _intervalId: NodeJS.Timeout;

  //TODO: check for better solution
  private _playerPreviousMatches = new Map<string, MatchRoom[]>();
  private _playerAchievements = new Map<string, UserAchievements[]>();

  stage: MatchStage = "chat";
  arePointsCalculated = false;
  playerHistoryLoaded = false;
  allPlayersVoted = false;

  get id() {
    return this._id;
  }

  get messages() {
    return this._messages;
  }

  get createdAt() {
    return this._createdAt;
  }

  get votingAt() {
    return this._votingAt;
  }

  get players() {
    return this._players;
  }

  get agents() {
    return this._agents;
  }

  // TODO: Inject initial prompt as first chat message from "host"
  constructor(playerIds: string[], botsInMatch: number) {
    this._id = uuid();

    this._agents = lodash.range(0, botsInMatch).map(() => {
      const characterId = this.popCharacterId();
      return new Agent(characterId, this);
    });

    const botPlayers = this.agents.map((agent) => agent.toPlayer());

    const humanPlayers = playerIds.map((id) => {
      const characterId = this.popCharacterId();
      return this.generatePlayer(id, characterId);
    });

    this._players = lodash.shuffle([...botPlayers, ...humanPlayers]);

    this.getPlayerStats().catch((err) => {
      console.error("Error loading player history:", err);
    });

    this.checkVerifiedPlayers().catch((err) => {
      console.error("Error checking if player is verified: ", err);
    });
    this.addPrompt();

    this.initMatch(playerIds).catch((err) =>
      console.error("Error initializing match: ", err),
    );

    this._intervalId = setInterval(() => {
      if (!this._isInitialized) return;
      this.matchLoop();
    }, 5000);
  }

  private async initMatch(playerIds: string[]) {
    await this.getPlayerStats();
    await this.checkVerifiedPlayers();

    ee.emit("readyToPlay", {
      roomId: this._id,
      players: playerIds,
    } satisfies ReadyToPlayPayload);
    ee.emit("queueUpdate");

    this._isInitialized = true;
  }

  private matchLoop() {
    const roomAge = Date.now() - this.createdAt;

    if (this.stage === "chat" && roomAge >= CHAT_TIME_MS) {
      this.stage = "voting";
      ee.emit(matchEvent(this.id, "stageChange"));
    }

    const votingTimeRanOut = roomAge >= CHAT_TIME_MS + VOTING_TIME_MS;

    if (this.stage === "voting" && (this.allPlayersVoted || votingTimeRanOut)) {
      this.stage = "results";
      this.calculatePoints();
      ee.emit(matchEvent(this.id, "stageChange"));
    }
  }

  private addPrompt() {
    const randomPrompt = matchPrompts[getRandomInt(matchPrompts.length)];
    if (!randomPrompt) throw new Error("No random prompt found");

    this.addMessage({
      sender: "host",
      message: randomPrompt,
      sentAt: Date.now(),
    });
  }

  private popCharacterId(): CharacterId {
    const characterId = this._availableCharacterIds.pop();

    if (!characterId)
      throw new Error("User generation failed: too many players");

    return characterId;
  }

  private generatePlayer(userId: string, characterId: CharacterId): PlayerType {
    return {
      userId,
      characterId,
      score: 0,
      isBot: false,
      isScoreSaved: false,
      botsBusted: 0,
      correctGuesses: 0,
      achievements: [],
    };
  }

  addMessage(message: ChatMessagePayload) {
    if (this.stage !== "chat") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Not in the chat stage",
      });
    }

    this._messageCountSinceLastTrigger++;
    this._messages.push(message);
    ee.emit(matchEvent(this.id), message);
  }

  vote(playerId: string, selectedPlayerIds: string[]) {
    if (this.stage !== "voting") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Not in the voting stage",
      });
    }

    if (selectedPlayerIds.includes(playerId)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Cannot pick yourself as a bot",
      });
    }

    const playerMessage = this.messages.find(
      (message) => message.sender === playerId,
    );

    if (!playerMessage) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Player never sent a message",
      });
    }

    this._players.forEach((player) => {
      if (player.userId !== playerId) return;
      player.votes = selectedPlayerIds;
    });

    const humanPlayers = this._players.filter((player) => !player.isBot);
    this.allPlayersVoted = humanPlayers.every(
      (player) => player.votes !== undefined,
    );
  }

  private async checkVerifiedPlayers() {
    const promises = this.players
      .filter((player) => !player.isBot)
      .map(async (player) => {
        if (player.isVerified !== undefined) return;

        const checkPlayer = await selectUserById(player.userId);
        player.isVerified = !!(checkPlayer?.username && checkPlayer?.address);
      });
    await Promise.allSettled(promises);
  }

  // TODO: make a proper DB relation with user and matches instead of doing this
  private async getPlayerStats() {
    const promises = this.players
      .filter((player) => !player.isBot)
      .map(async (player) => {
        if (
          this._playerPreviousMatches.get(player.userId) ??
          this._playerAchievements.get(player.userId)
        )
          return;

        const matchRooms = (
          await selectMatchPlayedByUser(player.userId, 5)
        ).map((match) => match.match.room);

        this._playerPreviousMatches.set(player.userId, matchRooms);

        const userAchievements = await selectUserAchievements(player.userId);
        this._playerAchievements.set(player.userId, userAchievements);
      });
    await Promise.allSettled(promises);
    this.playerHistoryLoaded = true;
  }

  calculatePoints() {
    this._players = this.players.map((player) => {
      let score = 0;
      let correctGuesses = 0;
      let botsBusted = 0;
      const otherPlayers = this.players.filter(
        (p) => p.userId !== player.userId,
      );

      if (player.votes) {
        otherPlayers.forEach((p) => {
          const isVoted = player.votes!.includes(p.userId);
          const hasGuessed = p.isBot ? isVoted : !isVoted;

          if (hasGuessed) {
            correctGuesses += 1;

            if (p.isBot) {
              botsBusted += 1;
              score += POINTS_BOT_BUSTED;
            } else {
              score += POINTS_HUMAN_BUSTED;
            }
          }
        });
      }

      if (player.isVerified) {
        // Check achievements
        const achievementPoints = Object.entries(matchAchievements)
          .filter(([_, achievement]) => {
            return achievement.calculate({
              player,
              messages: this._messages,
              botsBusted,
              otherPlayers,
              playerHistory: this._playerPreviousMatches.get(player.userId),
              playerAchievements: this._playerAchievements.get(player.userId),
            });
          })
          .reduce((totalPoints, [id, _]) => {
            const achievementId = achievementIdSchema.safeParse(id);
            if (!achievementId.success) return totalPoints;
            player.achievements.push(achievementId.data);

            return (totalPoints += POINTS_ACHIEVEMENTS[achievementId.data]);
          }, 0);

        score += achievementPoints;
      }
      return { ...player, score, correctGuesses, botsBusted };
    });

    this.arePointsCalculated = true;
  }

  async storeMatchStats(tx: BBPgTransaction) {
    let allScoresStored = true;

    const promises = this._players.map(async (player) => {
      try {
        if (player.isScoreSaved) return;

        player.isScoreSaved = true;

        if (player.isBot) return;

        await tx
          .update(users)
          .set({
            score: sql`${users.score} + ${player.score}`,
          })
          .where(eq(users.id, player.userId));

        const playerAchievements = player.achievements
          .filter((achievement) => {
            ACHIEVEMENTS_TO_STORE.includes(achievement);
          })
          .map((achievementId) => {
            return {
              userId: player.userId,
              achievementId: achievementId,
              achievedAt: new Date(),
            };
          });

        await tx.insert(userAchievements).values(playerAchievements);
      } catch (error) {
        player.isScoreSaved = false;
        allScoresStored = false;

        console.error("Score update error:", error);
      }
    });

    await Promise.all(promises);

    return allScoresStored;
  }

  cleanup() {
    this._messages = [];
    this._agents.forEach((agent) => agent.cleanup());
    clearInterval(this._intervalId);
  }

  convertMessages(): StoredChatMessage[] {
    return this._messages.flatMap((message) => {
      if (message.sender === "host") {
        return {
          ...message,
          sender: "host",
          isBot: false,
        } satisfies StoredChatMessage;
      }

      const player = this._players.find((p) => p.userId === message.sender);
      if (!player) return [];

      return { ...message, sender: player.characterId, isBot: !!player.isBot };
    });
  }

  toSerializable(): MatchRoom {
    const showSensitiveData = this.stage === "results";

    return {
      id: this.id,
      stage: this.stage,
      arePointsCalculated: this.arePointsCalculated,
      messages: this.messages,
      createdAt: this.createdAt,
      votingAt: this.votingAt,
      players: showSensitiveData
        ? this.players
        : this.players.map((player) => ({ ...player, isBot: undefined })),
    };
  }
}
