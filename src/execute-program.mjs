import {
  Account,
  AleoKeyProvider,
  AleoNetworkClient,
  NetworkRecordProvider,
  PrivateKey,
  ProgramManager,
} from "@aleohq/sdk";

const ALEO_NETWORK_URL = process.env.ALEO_NETWORK_URL;
const ALEO_PRIVATE_KEY = process.env.ALEO_PRIVATE_KEY;
const LEADERBOARD_PROGRAM_NAME = process.env.LEADERBOARD_PROGRAM_NAME;

if (!ALEO_NETWORK_URL || !ALEO_PRIVATE_KEY || !LEADERBOARD_PROGRAM_NAME) {
  throw new Error("Missing env variables");
}

const account = new Account({ privateKey: ALEO_PRIVATE_KEY });

const keyProvider = new AleoKeyProvider();
keyProvider.useCache(true);

const networkClient = new AleoNetworkClient(ALEO_NETWORK_URL ?? "");
const recordProvider = new NetworkRecordProvider(account, networkClient);

const programManager = new ProgramManager(
  ALEO_NETWORK_URL,
  keyProvider,
  recordProvider
);

const idsArg =
  "[553022319473841835241324053369526779010field,1515531690203881765739586217360383179440field,0field,0field,0field,0field,0field,0field,0field,0field,0field,0field,0field,0field,0field, 0field]";

const scoresArg =
  "[58u64,83u64,0u64,0u64,0u64,0u64,0u64,0u64,0u64,0u64,0u64,0u64,0u64,0u64,0u64,0u64]";

const sliceNum = "0u8";

const transitionName = "update_scores";

const txId = await programManager.execute(
  LEADERBOARD_PROGRAM_NAME ?? "",
  transitionName,
  20,
  false,
  [idsArg, scoresArg, sliceNum],
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  PrivateKey.from_string(ALEO_PRIVATE_KEY)
);
console.log("🚀 ~ txId:", txId);