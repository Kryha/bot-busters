import { TRPCError } from "@trpc/server";
import lodash from "lodash";
import { sql } from "drizzle-orm";

import {
  CHAT_TIME_MS,
  POINTS_BOT_BUSTED,
  POINTS_HUMAN_BUSTED,
} from "~/constants/index.js";
import { Agent } from "~/server/service/index.js";
import { ee, matchEvent } from "~/server/api/match-maker.js";
import { db } from "~/server/db/index.js";
import { users } from "~/server/db/schema.js";
import type {
  PlayerType,
  MatchRoom,
  ChatMessagePayload,
  MatchStage,
  CharacterId,
} from "~/types/index.js";
import { MATCH_ACHIEVEMENTS } from "./achievements.js";

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

  stage: MatchStage = "chat";
  arePointsCalculated = false;

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

  constructor(roomId: string, playerIds: string[], botsInMatch: number) {
    this._id = roomId;

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
    this.messages.push(message);
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
      (message) => message.sender === playerId
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
  }

  calculatePoints() {
    this._players = this.players.map((player) => {
      let score = 0;
      let correctGuesses = 0;
      let botsBusted = 0;

      const otherPlayers = this.players.filter(
        (p) => p.userId !== player.userId
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

      if (!player.isBot) {
        // TODO: Implement player stats functionality
        //const playerStats = getPlayerStats(player.id);

        // Check achievements
        const achievementPoints = Object.entries(MATCH_ACHIEVEMENTS)
          .map(([id, achievement]) => {
            const pointsEarned = achievement.calculate({
              player,
              messages: this._messages,
            });
            return { id, points: pointsEarned };
          })
          .filter((achievement) => achievement.points > 0)
          .reduce((totalPoints, achievement) => {
            player.achievements.push(achievement);
            return (totalPoints += achievement.points);
          }, 0);

        score += achievementPoints;
      }
      return { ...player, score, correctGuesses, botsBusted };
    });

    this.arePointsCalculated = true;
  }

  async storeScore() {
    let allScoresStored = true;

    const promises = this._players.map(async (player) => {
      try {
        if (player.isScoreSaved) return;

        player.isScoreSaved = true;

        if (player.isBot) return;

        await db.execute(
          sql`UPDATE ${users} SET score = score + ${player.score} WHERE ${users.id} = ${player.userId}`
        );
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
