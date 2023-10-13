import { createTRPCContext } from "./trpc";
import { appRouter } from "./root";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import ws from "ws";
import { env } from "@/env.cjs";
import { createServer } from "http";

// const app = next({ dev: env.NODE_ENV !== "production" });
// const handle = app.getRequestHandler();

const server = createServer();

// if (env.NODE_ENV === "production") {
//   server.on("upgrade", (request, socket, head) => {
//     const origin = request?.headers?.origin;
//     const corsRegex = /^https?:\/\/(.*\.?)kryha\.dev(:\d+)?\/$/g;
//     if (origin?.match(corsRegex) !== null) {
//       wss.handleUpgrade(request, socket, head, (ws) => {
//         wss.emit("connection", ws, request);
//       });
//     } else {
//       socket.destroy();
//     }
//   });
// }

const wss = new ws.Server({ server });
// const wss = new ws.Server({
//   port: 3001,
// });
const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: createTRPCContext,
});

wss.on("connection", (ws) => {
  console.log(`++ Connection (${wss.clients.size})`);
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

server.listen(3001);
