import {
  Account,
  AleoKeyProvider,
  AleoNetworkClient,
  NetworkRecordProvider,
  ProgramManager,
} from "@aleohq/sdk";

import { env } from "~/env.mjs";

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

export const aleo = { programManager };
