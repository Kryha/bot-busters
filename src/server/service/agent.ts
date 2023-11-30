import WebSocket from "ws";
import { env } from "~/env.mjs";
import { chatEvent, ee } from "~/server/api/match-maker.js";
import type { ChatMessagePayload, Player } from "~/server/api/match-types.js";

export const generateAgent = (
  agentId: string,
  roomId: string
): { agent: Player; ws: WebSocket } => {
  const agent = {
    userId: agentId,
    score: 0,
    isBot: true,
    isScoreSaved: false,
  };

  const ws = new WebSocket(env.NEXT_PUBLIC_WS_URL);

  ws.on("error", console.error);

  ws.on("open", function open(this) {
    console.log(`Agent ${agent.userId} is ON`);
    //   ws.send(
    //     JSON.stringify({
    //       sender: agent.userId,
    //       message: "I'm definitelly not a bot",
    //       sentAt: new Date(), // unix time
    //     })
    //   );
  });

  ee.on(chatEvent(roomId), (stream: ChatMessagePayload) => {
    console.log(stream);
    if (stream?.sender !== agent.userId) {
      const cb = () => {
        ee.emit(chatEvent(roomId), {
          sender: agent.userId,
          message: "Definitely not a bot....",
          sentAt: Date.now(),
        });
      };
      setTimeout(cb, 2000);
    }
  });

  // ws.on("message", function message(data) {
  //   console.log("received: %s", data);
  // });

  return { agent, ws };
};
