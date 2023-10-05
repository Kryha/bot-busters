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
