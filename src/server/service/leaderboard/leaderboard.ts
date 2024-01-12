import { eq } from "drizzle-orm";
import lodash from "lodash";

import { db, type BBPgTransaction } from "~/server/db/index.js";
import { updateRanks } from "~/server/db/rank.js";
import { ranks, users } from "~/server/db/schema.js";
import { uuidToBigInt } from "~/utils/uuid.js";

import { leaderboardWorker } from "./worker-client.js";

const USERS_ON_CHAIN = 112;
const USERS_PER_SLICE = 16;

const calculate = (tx?: BBPgTransaction) => updateRanks(tx);

const storeOnChain = async () => {
  const players = await db
    .select()
    .from(users)
    .innerJoin(ranks, eq(users.id, ranks.userId))
    .orderBy(ranks.position)
    .limit(USERS_ON_CHAIN);

  const userIds: string[] = [];
  const scores: string[] = [];

  players.forEach((p) => {
    const parsed = uuidToBigInt(p.user.id);

    userIds.push(`${parsed}field`);
    scores.push(`${p.user.score}u64`);
  });

  if (userIds.length !== scores.length) {
    throw new Error("Users and scores length do not match");
  }

  const slicesDividend =
    USERS_ON_CHAIN > players.length ? players.length : USERS_ON_CHAIN;
  const slicesAmount = Math.ceil(slicesDividend / USERS_PER_SLICE);

  const slices = lodash.range(0, slicesAmount).map((i) => {
    const start = i * USERS_PER_SLICE;
    const end = (i + 1) * USERS_PER_SLICE;

    if (end > userIds.length) {
      const diff = end - userIds.length;

      const fieldFill = new Array(diff).fill("0field") as string[];
      const u64Fill = new Array(diff).fill("0u64") as string[];

      return [
        [...userIds.slice(start, userIds.length), ...fieldFill],
        [...scores.slice(start, scores.length), ...u64Fill],
      ];
    } else {
      return [userIds.slice(start, end), scores.slice(start, end)];
    }
  });

  const executionPromises = slices.map(async ([idsSlice, scoresSlice], i) => {
    if (!idsSlice || !scoresSlice) throw new Error("Slicing error");

    const sliceNum = `${i}u8`;

    // TODO: if update for a specific slice fails, try again
    const txId = await leaderboardWorker.updateScores({
      slice: sliceNum,
      userIds: idsSlice,
      scores: scoresSlice,
    });

    if (txId instanceof Error) throw txId;
    return txId;
  });

  const txIds = await Promise.all(executionPromises);

  console.log("Executed transactions:", txIds);

  return txIds;
};

export const leaderboard = { calculate, storeOnChain };
