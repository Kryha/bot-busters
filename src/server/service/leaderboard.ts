import { PrivateKey } from "@aleohq/sdk";
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
  console.log("🚀 ~ storeOnChain ~ players:", players);

  const userIds: string[] = [];
  const scores: string[] = [];

  players.forEach((p) => {
    const parsed = uuidToBigInt(p.user.id);

    userIds.push(`${parsed}field`);
    scores.push(`${p.user.score}u64`);
  });

  console.log("🚀 ~ storeOnChain ~ userIds:", userIds);
  console.log("🚀 ~ storeOnChain ~ scores:", scores);

  if (userIds.length !== scores.length) {
    throw new Error("Users and scores length do not match");
  }

  const slicesDividend =
    USERS_ON_CHAIN > players.length ? players.length : USERS_ON_CHAIN;
  const slicesAmount = Math.ceil(slicesDividend / USERS_PER_SLICE);
  console.log("🚀 ~ storeOnChain ~ slicesAmount:", slicesAmount);

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
  console.log("🚀 ~ slices ~ slices:", slices);

  const executionPromises = slices.map(async ([idsSlice, scoresSlice], i) => {
    console.log("PROMISSEESESESESESESESESESESESESESESESE");
    if (!idsSlice || !scoresSlice) throw new Error("Slicing error");

    const idsArg = `[${idsSlice.toString()}]`.replaceAll('"', "");
    console.log("🚀 ~ executionPromises ~ idsArg:", idsArg);
    const scoresArg = `[${scoresSlice.toString()}]`.replaceAll('"', "");
    console.log("🚀 ~ executionPromises ~ scoresArg:", scoresArg);
    const sliceNum = `${i}u8`;
    console.log("🚀 ~ executionPromises ~ sliceNum:", sliceNum);

    // TODO: move this to a worker
    const txId = await aleo.programManager.execute(
      env.LEADERBOARD_PROGRAM_NAME,
      "update_scores",
      0.02,
      false,
      [idsArg, scoresArg, sliceNum],
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      PrivateKey.from_string(env.ALEO_PRIVATE_KEY)
    );
    console.log("🚀 ~ executionPromises ~ txId:", txId);

    if (txId instanceof Error) throw txId;
    return txId;
  });
  console.log("🚀 ~ executionPromises ~ executionPromises:", executionPromises);

  const txIds = await Promise.all(executionPromises);
  console.log("🚀 ~ storeOnChain ~ txIds:", txIds);

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
  console.log("🚀 ~ storeOnChain ~ transactions:", transactions);

  return transactions;
};

storeOnChain().catch((err) => console.error("store on chain:", err));

export const leaderboard = { calculate, storeOnChain };
