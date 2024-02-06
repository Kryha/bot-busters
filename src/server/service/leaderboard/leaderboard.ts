import { eq } from "drizzle-orm";
import lodash from "lodash";

import { db, type BBPgTransaction } from "~/server/db/index.js";
import { updateRanks } from "~/server/db/rank.js";
import { ranks, users } from "~/server/db/schema.js";
import { uuidToBigInt } from "~/utils/uuid.js";

import { leaderboardWorker } from "./worker-client.js";

const USERS_ON_CHAIN = 112; // amount of users that will be stored in the `users` mapping of `leaderboard` program
const USERS_PER_SLICE = 16; // maximum amount of users we can set in a finalize call (Leo language limitation)

interface ScoreSlice {
  idsSlice: string[];
  scoresSlice: string[];
  sliceIndex: string;
}

interface TxResultOk {
  isSuccess: true;
  txId: string;
}

interface TxResultErr {
  isSuccess: false;
}

type TxResult = TxResultOk | TxResultErr;

const calculate = (tx?: BBPgTransaction) => updateRanks(tx);

const sliceScores = (userIds: string[], scores: string[]): ScoreSlice[] => {
  const slicesDividend =
    USERS_ON_CHAIN > userIds.length ? userIds.length : USERS_ON_CHAIN;
  const slicesAmount = Math.ceil(slicesDividend / USERS_PER_SLICE);

  return lodash.range(0, slicesAmount).map((i) => {
    const start = i * USERS_PER_SLICE;
    const end = (i + 1) * USERS_PER_SLICE;

    if (end > userIds.length) {
      const diff = end - userIds.length;

      const fieldFill = new Array(diff).fill("0field") as string[];
      const u64Fill = new Array(diff).fill("0u64") as string[];

      return {
        idsSlice: [...userIds.slice(start, userIds.length), ...fieldFill],
        scoresSlice: [...scores.slice(start, scores.length), ...u64Fill],
        sliceIndex: `${i}u8`,
      };
    } else {
      return {
        idsSlice: userIds.slice(start, end),
        scoresSlice: scores.slice(start, end),
        sliceIndex: `${i}u8`,
      };
    }
  });
};

const executeUpdateScores = async ({
  idsSlice,
  scoresSlice,
  sliceIndex,
}: ScoreSlice): Promise<TxResult> => {
  try {
    const txId = (await leaderboardWorker.updateScores({
      slice: sliceIndex,
      userIds: idsSlice,
      scores: scoresSlice,
    })) as string | Error;

    if (txId instanceof Error) throw txId;

    return { txId, isSuccess: true };
  } catch (error) {
    return { isSuccess: false };
  }
};

// TODO: call this funtion once per day after testnet is working
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

  const slices: ScoreSlice[] = sliceScores(userIds, scores);

  let failedTransactions: TxResult[] = [];
  let tryCount = 3;

  do {
    tryCount--;
    failedTransactions = await Promise.all(
      slices.map((slice) => executeUpdateScores(slice)),
    ).then((txs) => txs.filter((tx) => !tx.isSuccess));
  } while (tryCount > 0 && failedTransactions.length);

  console.info("Executed transactions");
};

export const leaderboard = { calculate, storeOnChain };
