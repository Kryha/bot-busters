import { db, type BBPgTransaction } from "~/server/db/index.js";
import {
  matches as matchesTable,
  usersToMatches,
  type UserToMatch,
} from "~/server/db/schema.js";
import { type MatchRoom, type StoredChatMessage } from "~/types/index.js";
import { getCurrentSeason } from "./rank.js";

export const insertMatches = async (
  matches: {
    id: string;
    room: MatchRoom;
    messages: StoredChatMessage[];
    createdAt: string;
  }[],
  tx?: BBPgTransaction,
) => {
  const dbTx = tx ?? db;

  const currentSeason = await getCurrentSeason(tx);

  const matchesWithSeason = matches.map((match) => ({
    ...match,
    season: currentSeason,
  }));

  await dbTx.insert(matchesTable).values(matchesWithSeason);

  const promises = matches.map(async (match) => {
    const userMatch: UserToMatch[] = match.room.players
      .filter((player) => !player.isBot)
      .map((player) => ({
        userId: player.userId,
        matchId: match.id,
      }));
    await dbTx.insert(usersToMatches).values(userMatch);
  });

  await Promise.all(promises);
};
