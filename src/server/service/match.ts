import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";
import lodash from "lodash";
import { v4 as uuid } from "uuid";

import { matchPrompts } from "~/assets/text/match-prompts.js";
import {
  CHAT_TIME_MS,
  ONE_TIME_ACHIEVEMENTS,
  POINTS_ACHIEVEMENTS,
  POINTS_BOT_BUSTED,
  POINTS_HUMAN_BUSTED,
  POINTS_HUMAN_FOOLED,
  SPLASH_SCREEN_TIME_MS,
  VOTING_TIME_MS,
} from "~/constants/index.js";
import { ee, matchEvent } from "~/server/api/match-maker.js";
import { type BBPgTransaction } from "~/server/db/index.js";
import {
  userAchievements,
  type UserAchievements,
  users,
  type User,
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
  type TypingPayload,
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
  private _votingAt = Date.now() + CHAT_TIME_MS + SPLASH_SCREEN_TIME_MS; // unix timestamp
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
  private _typingTimers = new Map<string, NodeJS.Timeout>();

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

  constructor(users: User[], botsInMatch: number) {
    this._id = uuid();

    this._agents = lodash.range(0, botsInMatch).map(() => {
      const characterId = this.popCharacterId();
      return new Agent(characterId, this);
    });

    const botPlayers = this.agents.map((agent) => agent.toPlayer());

    const humanPlayers = users.map((user) => {
      const characterId = this.popCharacterId();
      return this.generatePlayer(user, characterId);
    });

    this._players = lodash.shuffle([...botPlayers, ...humanPlayers]);

    this.addHostPrompt();

    const userIds = users.map((u) => u.id);

    this.initMatch(userIds).catch((err) =>
      console.error("Error initializing match: ", err),
    );

    this._intervalId = setInterval(() => {
      if (!this._isInitialized) return;
      this.matchLoop();
    }, 5000);
  }

  private async initMatch(playerIds: string[]) {
    await this.getPlayerStats();

    ee.emit("readyToPlay", {
      roomId: this._id,
      players: playerIds,
    } satisfies ReadyToPlayPayload);
    ee.emit("queueUpdate");

    this._isInitialized = true;
  }

  private matchLoop() {
    const roomAge = Date.now() - this.createdAt - SPLASH_SCREEN_TIME_MS;

    if (this.stage === "chat" && roomAge >= CHAT_TIME_MS) {
      this.stage = "voting";
      ee.emit(matchEvent(this.id, "stageChange"));
    }

    const votingTimeRanOut =
      roomAge >= CHAT_TIME_MS + VOTING_TIME_MS + SPLASH_SCREEN_TIME_MS;

    if (this.stage === "voting" && (this.allPlayersVoted || votingTimeRanOut)) {
      this.stage = "results";
      this.calculatePoints();
      ee.emit(matchEvent(this.id, "stageChange"));
    }
  }

  private addHostPrompt() {
    const randomPrompt =
      matchPrompts[getRandomInt({ max: matchPrompts.length })];
    if (!randomPrompt) throw new Error("No random prompt found");

    this.addMessage({
      sender: "0",
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

  private generatePlayer(user: User, characterId: CharacterId): PlayerType {
    return {
      userId: user.id,
      characterId,
      score: 0,
      isBot: false,
      isScoreSaved: false,
      botsBusted: 0,
      totalBotsBusted: 0,
      humansBusted: 0,
      humansFooled: 0,
      botsBustedScore: 0,
      humansBustedScore: 0,
      humansFooledScore: 0,
      correctGuesses: 0,
      achievements: [],
      isOnline: true,
      isVerified: !!(user.username && user.address),
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

  setTyping(sender: string) {
    const prevTimer = this._typingTimers.get(sender);
    if (prevTimer) clearTimeout(prevTimer);

    const timeoutId = setTimeout(() => {
      ee.emit(matchEvent(this._id, "typing"), {
        isTyping: false,
        sender,
      } satisfies TypingPayload);
    }, 3000);

    this._typingTimers.set(sender, timeoutId);

    ee.emit(matchEvent(this._id, "typing"), {
      isTyping: true,
      sender,
    } satisfies TypingPayload);
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

        // getting total amount of bots busted by the player
        const playerInfo = await selectUserById(player.userId);
        if (playerInfo) {
          player.totalBotsBusted = playerInfo.botsBusted;
        }

        // getting the achievements earned by the player
        const playerMatchHistory = await selectMatchPlayedByUser(
          player.userId,
          5,
        );

        const matchRooms = playerMatchHistory.map((match) => match.match.room);

        this._playerPreviousMatches.set(player.userId, matchRooms);

        const userAchievements = await selectUserAchievements(player.userId);
        this._playerAchievements.set(player.userId, userAchievements);
      });
    await Promise.allSettled(promises);
    this.playerHistoryLoaded = true;
  }

  calculatePoints() {
    this._players = this.players.map((player) => {
      let correctGuesses = 0;
      let botsBusted = 0;
      let humansBusted = 0;
      let humansFooled = 0;
      let score = 0;
      let botsBustedScore = 0;
      let humansBustedScore = 0;
      let humansFooledScore = 0;

      const otherPlayers = this.players.filter(
        (p) => p.userId !== player.userId,
      );

      // Checking if the player is entitled to get points
      if (!player.votes) return { ...player };

      otherPlayers.forEach((p) => {
        const isVoted = player.votes!.includes(p.userId);
        const fooledHuman = p.votes?.includes(player.userId);

        const hasGuessed = p.isBot ? isVoted : !isVoted;

        if (fooledHuman) {
          humansFooled += 1;
          score += POINTS_HUMAN_FOOLED;
          humansFooledScore += POINTS_HUMAN_FOOLED;
        }

        if (hasGuessed) {
          correctGuesses += 1;

          if (p.isBot) {
            botsBusted += 1;
            score += POINTS_BOT_BUSTED;
            botsBustedScore += POINTS_BOT_BUSTED;
          } else {
            humansBusted += 1;
            score += POINTS_HUMAN_BUSTED;
            humansBustedScore += POINTS_HUMAN_BUSTED;
          }
        }
      });

      if (player.isVerified) {
        // Check achievements
        const achievementPoints = Object.entries(matchAchievements)
          .filter(([_, achievement]) =>
            achievement.calculate({
              player,
              botsBusted,
              otherPlayers,
              playerHistory:
                this._playerPreviousMatches.get(player.userId) ?? [],
              playerAchievements:
                this._playerAchievements.get(player.userId) ?? [],
            }),
          )
          .reduce((totalPoints, [id, _]) => {
            const achievementId = achievementIdSchema.safeParse(id);
            if (!achievementId.success) return totalPoints;

            // TODO: don't mutate attributes here
            player.achievements.push(achievementId.data);

            return totalPoints + POINTS_ACHIEVEMENTS[achievementId.data];
          }, 0);

        score += achievementPoints;
      }

      return {
        ...player,
        score,
        correctGuesses,
        botsBusted,
        humansBusted,
        humansFooled,
        botsBustedScore,
        humansBustedScore,
        humansFooledScore,
      };
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
            botsBusted: sql`${users.botsBusted} + ${player.botsBusted}`,
          })
          .where(eq(users.id, player.userId));

        const playerAchievements = player.achievements
          .filter((achievement) => ONE_TIME_ACHIEVEMENTS.includes(achievement))
          .map((achievementId) => {
            return {
              userId: player.userId,
              achievementId: achievementId,
              achievedAt: new Date(),
            };
          });
        if (playerAchievements.length !== 0) {
          await tx.insert(userAchievements).values(playerAchievements);
        }
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
      if (message.sender === "0") {
        return {
          ...message,
          sender: "0",
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
