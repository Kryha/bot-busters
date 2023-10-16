import { createTRPCContext } from "./trpc";
import { appRouter } from "./root";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import http from "http";
import next from "next";
import { parse } from "url";
import ws from "ws";
import { env } from "@/env.cjs";

const port = 3000;
const app = next({ dev: env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

const server = http.createServer((req, res) => {
  const parsedUrl = parse(req.url!, true);
  void handle(req, res, parsedUrl);
});

const wss = new ws.Server({ server });
const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: createTRPCContext,
});

wss.on("connection", (ws) => {
  console.log(`++ Connection (${wss.clients.size})`);
  ws.on("error", (error) => console.error("ws error: ", error));

  ws.once("close", () => {
    console.log(`-- Connection (${wss.clients.size})`);
  });
});

// wss.on("error", (error) => {
//   console.error("ws error:", error);
// });

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});

void app.prepare().then(() => {
  server.listen(port);
  console.log(
    `> Server listening at http://localhost:${port} as ${env.NODE_ENV}`
  );
});

// import { createTRPCContext } from "./trpc";
// import { appRouter } from "./root";
// import { applyWSSHandler } from "@trpc/server/adapters/ws";
// import http from "http";
// import next from "next";
// import { parse } from "url";
// import ws from "ws";
// import { env } from "@/env.cjs";

// const port = 3000;
// const app = next({ dev: env.NODE_ENV !== "production" });
// const handle = app.getRequestHandler();

// void app.prepare().then(() => {
//   const server = http.createServer((req, res) => {
// const proto = req.headers["x-forwarded-proto"];
// if (proto && proto === "http") {
//   // redirect to ssl
//   res.writeHead(303, {
//     location:
//       `https://` + req.headers.host + ((req.headers.url as string) ?? ""),
//   });
//   res.end();
//   return;
// }

//     const parsedUrl = parse(req.url!, true);
//     void handle(req, res, parsedUrl);
//   });
//   const wss = new ws.Server({ server });
//   const handler = applyWSSHandler({
//     wss,
//     router: appRouter,
//     createContext: createTRPCContext,
//   });

//   // server.on("upgrade", (request, socket, head) => {
//   //   const origin = request?.headers?.origin;
//   //   const corsRegex = /^https?:\/\/(.*\.?)kryha\.dev(:\d+)?\/$/g;
//   //   if (origin?.match(corsRegex) !== null) {
//   //     wss.handleUpgrade(request, socket, head, (ws) => {
//   //       wss.emit("connection", ws, request);
//   //     });
//   //   } else {
//   //     socket.destroy();
//   //   }
//   // });

//   wss.on("connection", (ws) => {
//     console.log(`++ Connection (${wss.clients.size})`);
//     ws.on("error", (error) => console.error("ws error: ", error));

//     ws.once("close", () => {
//       console.log(`-- Connection (${wss.clients.size})`);
//     });
//   });

//   // wss.on("error", (error) => {
//   //   console.error("ws error:", error);
//   // });

//   process.on("SIGTERM", () => {
//     console.log("SIGTERM");
//     handler.broadcastReconnectNotification();
//   });
//   server.listen(port);

//   console.log(
//     `> Server listening at http://localhost:${port} as ${env.NODE_ENV}`
//   );
// });
