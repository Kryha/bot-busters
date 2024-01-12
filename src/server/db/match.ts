import { db, type BBPgTransaction } from "~/server/db/index.js";
import { matches as matchesTable } from "~/server/db/schema.js";
import { userToMatches } from "~/server/db/schema.js";
import { type MatchRoom } from "~/types";

export const updateUserToMatch = async (
  matches: { id: string; room: MatchRoom }[],
  tx?: BBPgTransaction
) => {
  const dbTx = tx ?? db;
  await dbTx.insert(matchesTable).values(matches);

  matches.map(async (match) => {
    const userMatch: { userId: string; matchId: string }[] = match.room.players
      .filter((player) => {
        if (!player.isBot) return player;
      })
      .map((player) => {
        return {
          userId: player.userId,
          matchId: match.id,
        };
      });
    await dbTx.insert(userToMatches).values(userMatch);
  });
};
