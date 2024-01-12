# Bot Busters

Chat, be human and bust bots!

## Local development

Before running the app in dev mode, make sure you have a running instance of [Docker](https://www.docker.com/), and run the following command from the root directory to spin up a database instance:

```sh
yarn db:run
```

Create a `.env` file from `.env.example`:

```sh
cp .env.example .env
```

### Building and running

To build and run the application locally, run the following commands:

```sh
yarn build
yarn start
```

### Running in dev mode

> ⚠️ There are currently some issues with router redirection when using `yarn dev`. Please prefer running it with `yarn start` until those issues are fixed.

Build and run the development web socket:

```sh
yarn dev:ws
```

Open another terminal window and run the application in dev mode:

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

### Run the chain locally

To run a local instance of an Aleo network, you have to install [SnarkOS CLI](https://github.com/AleoHQ/snarkOS?tab=readme-ov-file#22-installation) and [tmux](https://github.com/tmux/tmux/wiki/Installing) on your computer, then run the following command from the Bot Busters root directory:

```sh
yarn aleo:devnet
```

> You can type `ctrl+b` and type `:kill-session` to stop the network.

### Deploy the Leaderboard program locally

To deploy the Leaderboard program locally, set the following variables in your `.env` file:

```sh
ALEO_NETWORK_URL="http://localhost:3030"
ALEO_PRIVATE_KEY="APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH"
LEADERBOARD_PROGRAM_NAME="leaderboard.aleo"
```

> These are the same as the defaults copied from `.env.example`.

Build the program:

```sh
yarn aleo:build-leaderboard
```

Deploy the program:

```sh
yarn aleo:deploy-leaderboard
```

> It's normal for the script to take a while to complete.

If you wish to re-deploy the leaderboard you will have to update its name in the `.env` before re-running the deploy script. Aleo uses program names as identifiers, thus 2 programs with the same name cannot co-exist on the same network.
