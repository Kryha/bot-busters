// import { readFile } from "fs/promises";

const deploy = async () => {
  const { readFile } = await import("fs/promises");
  const {
    Account,
    AleoNetworkClient,
    NetworkRecordProvider,
    ProgramManager,
    AleoKeyProvider,
  } = await import("@aleohq/sdk");

  const account = new Account({ privateKey: process.env.ALEO_PRIVATE_KEY! });
  const ALEO_NETWORK_URL = process.env.ALEO_NETWORK_URL!;

  const keyProvider = new AleoKeyProvider();
  keyProvider.useCache(true);

  const networkClient = new AleoNetworkClient(ALEO_NETWORK_URL);
  const recordProvider = new NetworkRecordProvider(account, networkClient);

  // Initialize a program manager to talk to the Aleo network with the configured key and record providers
  const programManager = new ProgramManager(
    ALEO_NETWORK_URL,
    keyProvider,
    recordProvider
  );

  // Define a fee to pay to deploy the program
  const fee = 1.8; // 1.8 Aleo credits

  const program = await readFile(
    "./programs/leaderboard/build/main.aleo",
    "utf-8"
  );

  // Deploy the program to the Aleo network
  const txId = await programManager.deploy(program, fee, false);

  if (txId instanceof Error) {
    console.error(txId);
    return;
  }

  // Verify the transaction was successful
  const transaction = await programManager.networkClient.getTransaction(txId);

  if (transaction instanceof Error) {
    console.error(transaction);
    return;
  }

  console.log(transaction);
  console.log("Deployment successful!");
};

void deploy();
