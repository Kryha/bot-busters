import { createTRPCContext } from "./trpc";
import { appRouter } from "./root";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import http from "http";
import next from "next";
import { parse } from "url";
import ws from "ws";
import { env } from "@/env.mjs";

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

  const wss = new ws.Server({ server });
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
    `> Server listening at http://localhost:${port} as ${env.NODE_ENV}`
  );
});
