import http from "k6/http";
import ws from "k6/ws";
import { check, sleep } from "k6";

/** @type {import("k6/options").Options} */
export const options = {
  stages: [
    { duration: "30s", target: 1000 },
    { duration: "1m", target: 10000 },
    { duration: "30s", target: 500 },
    { duration: "20s", target: 0 },
  ],
};

export default function () {
  const httpRes = http.get("https://bot-busters.staging.kryha.dev");
  check(httpRes, { "status was 200": (r) => r.status === 200 });

  const wsUrl = "wss://bot-busters.staging.kryha.dev/";

  const wsRes = ws.connect(wsUrl, null, (socket) => {
    socket.on("open", () => console.log("connected"));
    socket.on("message", (data) => console.log("Message received: ", data));
    socket.on("close", () => console.log("disconnected"));
  });

  check(wsRes, { "status is 101": (r) => r && r.status === 101 });

  sleep(1);
}
