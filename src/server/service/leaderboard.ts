import { desc, eq } from "drizzle-orm";
import lodash from "lodash";

import { env } from "~/env.mjs";
import { db, type BBPgTransaction } from "~/server/db/index.js";
import { updateRanks } from "~/server/db/rank.js";
import { ranks, users } from "~/server/db/schema.js";
import { aleo } from "~/server/service/aleo.js";
import { uuidToBigInt } from "~/utils/uuid.js";

const USERS_ON_CHAIN = 112;
const USERS_PER_SLICE = 16;

const calculate = (tx?: BBPgTransaction) => updateRanks(tx);

const storeOnChain = async () => {
  const players = await db
    .select()
    .from(users)
    .innerJoin(ranks, eq(users.id, ranks.userId))
    .orderBy(desc(ranks.position))
    .limit(USERS_ON_CHAIN);

  const userIds: string[] = [];
  const scores: string[] = [];

  players.forEach((p) => {
    const parsed = uuidToBigInt(p.user.id);

    userIds.push(`${parsed}field`);
    scores.push(`${p.user.score}u8`);
  });

  if (userIds.length !== scores.length) {
    throw new Error("Users and scores length do not match");
  }

  const slicesDividend =
    USERS_ON_CHAIN > players.length ? USERS_ON_CHAIN : players.length;
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

    const txId = await aleo.programManager.execute(
      env.LEADERBOARD_PROGRAM_NAME,
      "update_scores",
      0.02,
      false,
      [idsSlice.toString(), scoresSlice.toString(), i.toString()]
    );

    if (txId instanceof Error) throw txId;
    return txId;
  });

  const txIds = await Promise.all(executionPromises);

  const transactions = await Promise.all(
    txIds.map(async (txId) => {
      const transaction =
        await aleo.programManager.networkClient.getTransaction(txId);

      if (transaction instanceof Error) {
        console.error("Transaction fetch error:", transaction);
      }

      return transaction;
    })
  );

  return transactions;
};

export const leaderboard = { calculate, storeOnChain };
