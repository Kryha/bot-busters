import {
  Account,
  AleoKeyProvider,
  AleoNetworkClient,
  NetworkRecordProvider,
  ProgramManager,
} from "@aleohq/sdk";

import { env } from "~/env.mjs";

//! do not pass the private key here, else the sdk will fail
const account = new Account();

const keyProvider = new AleoKeyProvider();
keyProvider.useCache(true);

const networkClient = new AleoNetworkClient(env.ALEO_NETWORK_URL);
const recordProvider = new NetworkRecordProvider(account, networkClient);

const programManager = new ProgramManager(
  env.ALEO_NETWORK_URL,
  keyProvider,
  recordProvider,
);

export const aleo = { programManager };
