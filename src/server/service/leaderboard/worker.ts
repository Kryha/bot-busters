import { isMainThread, parentPort, workerData } from "node:worker_threads";
import { PrivateKey } from "@aleohq/sdk";

import { aleo } from "~/server/service/aleo.js";
import { env } from "~/env.mjs";

import { updateScoreArgsSchema } from "./types.js";

const TX_FEE = 5;

if (!parentPort || isMainThread) {
  throw new Error("Worker should not be executed on the main thread.");
}

const { scores, slice, userIds } = updateScoreArgsSchema.parse(workerData);

const idsArg = `[${userIds.toString()}]`.replaceAll('"', "");
const scoresArg = `[${scores.toString()}]`.replaceAll('"', "");

const txId = await aleo.programManager.execute(
  env.LEADERBOARD_PROGRAM_NAME,
  "update_scores",
  TX_FEE,
  false,
  [idsArg, scoresArg, slice],
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  PrivateKey.from_string(env.ALEO_PRIVATE_KEY)
);

parentPort.postMessage(txId);
