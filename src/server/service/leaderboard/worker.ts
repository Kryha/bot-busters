// This file is referenced by `worker-client.ts` thus they should always stay in the same directory

import { isMainThread, parentPort, workerData } from "node:worker_threads";
import { PrivateKey } from "@provablehq/sdk";

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

const txId = await aleo.programManager.execute({
  programName: env.LEADERBOARD_PROGRAM_NAME,
  functionName: "update_scores",
  fee: TX_FEE,
  privateFee: false,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  privateKey: PrivateKey.from_string(env.ALEO_PRIVATE_KEY),
  inputs: [idsArg, scoresArg, slice],
});

parentPort.postMessage(txId);
