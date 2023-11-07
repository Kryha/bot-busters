import { env } from "@/env.cjs";
import { uuidToBigInt } from "@/utils/uuid";
import {
  Account,
  AleoKeyProvider,
  AleoNetworkClient,
  NetworkRecordProvider,
  ProgramManager,
} from "@aleohq/sdk";

const account = new Account({ privateKey: env.ALEO_PRIVATE_KEY });

const keyProvider = new AleoKeyProvider();
keyProvider.useCache(true);

const networkClient = new AleoNetworkClient(env.ALEO_NETWORK_URL);
const recordProvider = new NetworkRecordProvider(account, networkClient);

const programManager = new ProgramManager(
  env.ALEO_NETWORK_URL,
  keyProvider,
  recordProvider
);

// TODO: update more users at once in the program
export const updateScore = async (userId: string, score: number) => {
  const parsedUserId = uuidToBigInt(userId);

  if (!parsedUserId) return new Error("Failed parsing user id");

  const txId = await programManager.execute(
    env.ALEO_PROGRAM_NAME,
    "update_score",
    0.02,
    false,
    [`${parsedUserId}field`, `${score}u64`]
  );

  if (txId instanceof Error) {
    console.error("Program execution error:", txId);
    return txId;
  }

  const transaction = await programManager.networkClient.getTransaction(txId);

  if (transaction instanceof Error) {
    console.error("Transaction fetch error:", transaction);
  }

  return transaction;
};
