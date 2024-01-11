import { applyWSSHandler } from "@trpc/server/adapters/ws";
import http from "http";
import next from "next";
import { parse } from "url";
import { WebSocketServer } from "ws";

import { env } from "~/env.mjs";

import { createTRPCContext } from "./trpc.js";
import { appRouter } from "./root.js";

const port = 3000;
const app = next({ dev: env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

void app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    void handle(req, res, parsedUrl).catch((error) => {
      console.error("Request handling error:", error);
    });
  });

  const wss = new WebSocketServer({ server });
  const handler = applyWSSHandler({
    wss,
    router: appRouter,
    createContext: createTRPCContext,
  });

  wss.on("connection", (ws) => {
    console.log(`++ Connection (${wss.clients.size})`);

    ws.on("error", (error) => {
      console.error("ws error: ", error);
    });

    ws.once("close", () => {
      console.log(`-- Connection (${wss.clients.size})`);
    });
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM");
    handler.broadcastReconnectNotification();
    wss.close();
  });

  server.listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${env.NODE_ENV}`,
  );
});
