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

const metrics = {
  activeConnections: 0,

  incrActiveConnections() {
    this.activeConnections++;
  },

  decrActiveConnections() {
    if (this.activeConnections <= 0) {
      this.activeConnections = 0;
    } else {
      this.activeConnections--;
    }
  },
};

void app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    if (req.url === "/metrics") {
      res.end(
        "# HELP active_connections_total The amount of total active ws connections\n# TYPE active_connections_total counter\nactive_connections_total " +
          metrics.activeConnections +
          "\n",
      );
      return;
    }

    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl).catch((error) => {
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
    metrics.incrActiveConnections();

    ws.on("error", (error) => {
      console.error("ws error: ", error);
    });

    ws.once("close", () => {
      console.log(`-- Connection (${wss.clients.size})`);
      metrics.decrActiveConnections();
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
