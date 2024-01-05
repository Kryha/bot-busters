import { desc, eq } from "drizzle-orm";
import { range } from "lodash";

import { env } from "~/env.mjs";
import { db, type BBPgTransaction } from "~/server/db/index.js";
import { updateRanks } from "~/server/db/rank.js";
import { ranks, users } from "~/server/db/schema.js";
import { aleo } from "~/server/service/aleo.js";
import { uuidToBigInt } from "~/utils/uuid.js";

const USERS_ON_CHAIN = 128;

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

  const slicesDividend =
    USERS_ON_CHAIN > players.length ? USERS_ON_CHAIN : players.length;
  const slices = Math.ceil(slicesDividend / aleo.LEO_ARRAY_SIZE);

  const executionPromises = range(0, slices).map(async (slice) => {
    const txId = await aleo.programManager.execute(
      env.LEADERBOARD_PROGRAM_NAME,
      "update_scores",
      0.02,
      false,
      [userIds.toString(), scores.toString(), slice.toString()]
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
