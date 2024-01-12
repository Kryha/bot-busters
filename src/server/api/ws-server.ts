import { WebSocketServer } from "ws";
import { applyWSSHandler } from "@trpc/server/adapters/ws";

import { env } from "~/env.mjs";

import { createTRPCContext } from "./trpc.js";
import { appRouter } from "./root.js";

const wss = new WebSocketServer({ port: 3001 });

const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: createTRPCContext,
});

wss.on("connection", (ws) => {
  console.log(`++ Connection (${wss.clients.size})`);

  ws.on("error", (error) => {
    console.error(error);
  });

  ws.once("close", () => {
    console.log(`-- Connection (${wss.clients.size})`);
  });
});

console.log(
  `✅ WebSocket Server listening on ws://localhost:3001 in ${env.NODE_ENV} environment`,
);

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
