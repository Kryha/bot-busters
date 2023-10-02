# Bot Busters

Chat, be human and bust bots!

# Getting started with Aleo

Aleo is aiming to build a platform for web applications that are performant, secure, and private.

### Getting started:

Before getting started there are a few prerequisites that you need to have installed on your machine. these are listed below:

- Rust: [Rustup](https://rustup.rs/)
- Git: [Git](https://git-scm.com/downloads)

now its time to install the Aleo tools. Make sure you are in a folder where you keep github repo's that you want to install. There are two tools that you need to install:

**Leo**: this is the high-level language that abstracts complex cryptography concepts. This language is used to create smart contracts on the Aleo network.

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

Now that we have installed the necessary tools we can start building our first smart contract. lets first run the the Aleo chain locally so that we can interact with it.

## Running the chain locally

If you previously started a chain and want to start with a clean chain you can run this command:

```bash
snarkos clean --dev 0
```

start up a local instance of snarkOs using the following command:

```bash
snarkos start --nodisplay --dev 0 --beacon
```

It will take some time before the chain is started. When its done loading you will keys it generated. A private key view-key and address these are always the same and can be used to interact with the chain. You can also create your own keys using the Leo cli. Remember to provide credits to this account before you can deploy a contract.

- **Private Key:** APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH
- **View Key:** AViewKey1mSnpFFC8Mj4fXbK5YiWgZ3mjiV8CxA79bYNa8ymUpTrw
- **Address:** aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px

Now open an new terminal window. In the new window we can set environment variables so in future command we can easily use the values. set them with the following command:

```bash
VIEW_KEY=AViewKey1mSnpFFC8Mj4fXbK5YiWgZ3mjiV8CxA79bYNa8ymUpTrw
ADDRESS=aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px
PRIVATE_KEY=APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH
```

Before we can perform actions on the local chain we need to get some unspent records. We can do this by running the following command:

```bash
snarkos developer scan -v $VIEW_KEY --start 0 --end 1 --endpoint "http://localhost:3030"
```

From the list of unspent records we need to select one to use in our transaction. From the list select the first record and copy it. We will use this value in the next command. Putting this record in an environment variable makes the coming command much more readable.

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

## Deploy to the local chain.

Now we have everything to develop and locally deploy a Leo contract. Go to the location of your Leo contract or start a new project with the following command:

```bash
leo new hello
```

Make sure you build the project with the latest changes and check if there is a folder **./build** in the project root. To deploy the build of your contract to the local chain you can use this command.

```bash

snarkos developer deploy <Name-of-your-contract>.aleo --private-key <PRIVATE_KEY> --query "http://localhost:3030" --path "../leo/examples/fibonacci/build/" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --fee 600000 --record <INPUT_RECORD>
```

Example

```bash

snarkos developer deploy hello.aleo --private-key $PRIVATE_KEY --query "http://localhost:3030" --path "./build/" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --fee 600000 --record $RECORD
```

Now your contract is deployed. Interacting with the contract can be done with the following command.