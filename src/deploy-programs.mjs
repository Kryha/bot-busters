import { readFile } from "fs/promises";
import {
  Account,
  AleoNetworkClient,
  NetworkRecordProvider,
  ProgramManager,
  AleoKeyProvider,
} from "@provablehq/sdk";

const deploy = async () => {
  try {
    const ALEO_NETWORK_URL = process.env.ALEO_NETWORK_URL;
    const ALEO_PRIVATE_KEY = process.env.ALEO_PRIVATE_KEY;
    const LEADERBOARD_PROGRAM_NAME = process.env.LEADERBOARD_PROGRAM_NAME;

    if (!ALEO_NETWORK_URL || !ALEO_PRIVATE_KEY || !LEADERBOARD_PROGRAM_NAME) {
      throw new Error("Missing env variables");
    }

    const account = new Account({ privateKey: ALEO_PRIVATE_KEY });

    const keyProvider = new AleoKeyProvider();
    keyProvider.useCache(true);

    const networkClient = new AleoNetworkClient(ALEO_NETWORK_URL);
    const recordProvider = new NetworkRecordProvider(account, networkClient);

    // Initialize a program manager to talk to the Aleo network with the configured key and record providers
    const programManager = new ProgramManager(
      ALEO_NETWORK_URL,
      keyProvider,
      recordProvider,
    );

    programManager.setAccount(account);

    // Define a fee to pay to deploy the program
    const fee = 4.408;

    const program = await readFile(
      "./programs/leaderboard/build/main.aleo",
      "utf-8",
    ).then((p) => p.replaceAll("leaderboard.aleo", LEADERBOARD_PROGRAM_NAME));

    const txId = await programManager.deploy(program, fee, false);

    console.log("TX id:", txId);

    // Verify the transaction was successful
    // const transaction = await programManager.networkClient.getTransaction(txId);

    // console.log(transaction);

    console.log(
      "Deployment successful! Check your wallet and wait a couple of seconds for your transaction to complete.",
    );
  } catch (error) {
    console.error(error);
    return;
  }
};

void deploy().then(() => process.exit());
