import { db, type BBPgTransaction } from "~/server/db/index.js";
import {
  type UserToMatch,
  matches as matchesTable,
} from "~/server/db/schema.js";
import { usersToMatches } from "~/server/db/schema.js";
import { type MatchRoom } from "~/types/index.js";

export const insertMatches = async (
  matches: { id: string; room: MatchRoom }[],
  tx?: BBPgTransaction,
) => {
  const dbTx = tx ?? db;
  await dbTx.insert(matchesTable).values(matches);

  const promises = matches.map(async (match) => {
    const userMatch: UserToMatch[] = match.room.players
      .filter((player) => {
        return !player.isBot;
      })
      .map((player) => {
        return {
          userId: player.userId,
          matchId: match.id,
        };
      });
    await dbTx.insert(usersToMatches).values(userMatch);
  } )
  
  Promise.all(promises).catch((error) => {
    console.error("Error inserting matches:", error);
  });
};
