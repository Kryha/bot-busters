import { createTRPCContext } from "./trpc";
import { appRouter } from "./root";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import ws from "ws";
import { env } from "@/env.cjs";

const wss = new ws.Server({ port: 3001 });

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
  `✅ WebSocket Server listening on ws://localhost:3001 in ${env.NODE_ENV} environment`
);

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
