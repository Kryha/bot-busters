# Bot Busters

Chat, be human and bust bots!

## Local development

Before running the app in dev mode, make sure you have a running instance of [Docker](https://www.docker.com/), and run the following command from the root directory to spin up a database instance:

```sh
docker-compose up -d
```

Create all the necessary DB tables:

```sh
yarn db:push
```

Now, run the application in dev mode:

```sh
yarn dev
```

Happy hacking!

## Getting started with Aleo

Aleo is aiming to build a platform for web applications that are performant, secure, and private.

### Getting started

Before getting started there are a few prerequisites that you need to have installed on your machine. these are listed below:

- Rust: [Rustup](https://rustup.rs/)
- Git: [Git](https://git-scm.com/downloads)
- Git LFS: [Git Large File Storage](https://git-lfs.github.com/)

Now its time to install the Aleo tools. There are two tools that you need to install:

**Leo**: a high-level language that abstracts low-level cryptography concepts and makes it easy to integrate private applications into your stack. This language is used to create programs on the Aleo network.

```bash
# Download the source code
git clone https://github.com/AleoHQ/leo
cd leo

# Build and install
cargo install --path .
```

**snarkOS:** this is a decentralized operating system for zero-knowledge applications. This code forms the backbone of [Aleo](https://aleo.org/) network, which verifies transactions and stores the encrypted state applications in a publicly-verifiable manner.

```bash
git clone https://github.com/AleoHQ/snarkOS.git
cd snarkOS
git checkout testnet3
cargo install --path .
```

Now that we have installed the necessary tools we can start building our first smart contract. Let's first use SnarkOS to run a local Aleo node where we are going to deploy our programs during development.

### Running the chain locally

In this section we will run a local node of SnarkOs and deploy a contract to it. If you want a more detailed explanation of the steps below you can read the [Aleo Documentation](https://developer.aleo.org/testnet/getting_started/deploy_execute).

Run a local node of SnarkOs using the following command:

```bash
snarkos start --nodisplay --dev 0 --beacon
```

If you previously started a chain and want to start with a clean chain you can run this command:

```bash
snarkos clean --dev 0
```

It will take some time before the node is started. When it's done loading, you will see a prompt containing details about the deployer account: private key, view-key and address. When you are running the node in dev mode, the following account will be used:

- **Private Key:** APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH
- **View Key:** AViewKey1mSnpFFC8Mj4fXbK5YiWgZ3mjiV8CxA79bYNa8ymUpTrw
- **Address:** aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px

Now open an new terminal window. In the new window we can set some environment variables that will be necessary later on:

```bash
VIEW_KEY=AViewKey1mSnpFFC8Mj4fXbK5YiWgZ3mjiV8CxA79bYNa8ymUpTrw
ADDRESS=aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px
PRIVATE_KEY=APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH
```

Before we can perform actions on the local chain we need to get some unspent records. We can do this by running the following command:

```bash
snarkos developer scan -v $VIEW_KEY --start 0 --end 1 --endpoint "http://localhost:3030"
```

From the list, select the first record and copy it. We will use this value to generate a transaction in an upcoming command.

```bash
# Output previous command

Scanning 1 blocks for records (100% complete)...

⚠️  This list may contain records that have already been spent.

[
  "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 93750000000000u64.private,  _nonce: 239342958985106763708738609678182549854111744243820417353521050114416207606group.public}",
  "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 93750000000000u64.private,  _nonce: 6943652577720031695852320528779080923424298438422299389212028025252409913592group.public}",
  ........
]

```

Let's put the copied record in a environment variable:

```bash
  RECORD="{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 93750000000000u64.private,  _nonce: 239342958985106763708738609678182549854111744243820417353521050114416207606group.public}"
```

### Deploy to the local chain

Now we have everything to develop and locally deploy a Leo contract. Go to the location of your Leo contract or start a new project.

Make sure you build the project with the latest changes and check if there is a **./build** directory in the directory of our program. To deploy the program make sure you are in the program directory and run:

```bash

snarkos developer deploy leaderboard.aleo --private-key $PRIVATE_KEY --query "http://localhost:3030" --path "./build/" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --fee 600000 --record $RECORD

```

The program is now deployed to the local node. The record you provided is now spent and you can't be used again. If you want a new spendable record, you can copy the transaction ID from the deployment command output. When copying the transaction ID open your browser or program that you use to interact with REST APIs and make a GET request to the following endpoint:

```text
http://localhost:3030/testnet3/transaction/<transaction-id>
```

In the response look for the record cipher text (it's in the `outputs` field and should start with `record1`). Now go to the [Aleo SDK website](https://aleo.tools/record) and decrypt the record with the view key of the account used to deploy the program. You can now set the output of the function as your new $RECORD environment variable.

Now your contract is deployed. Interacting with the contract can be done with the following command.

<!-- TODO: add proper function call -->

```bash

snarkos developer execute leaderboard.aleo addPlayer <Player-Data> --private-key $PRIVATE_KEY --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast"

```
