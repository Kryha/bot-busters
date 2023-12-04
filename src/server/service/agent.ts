import WebSocket from "ws";
import { env } from "~/env.mjs";
import { matchEvent, ee, assignCharacterId } from "~/server/api/match-maker.js";
import type {
  ChatMessagePayload,
  PlayerType,
} from "~/server/api/match-types.js";

// TODO: Update Agent type
export const generateAgent = (
  agentId: string,
  roomId: string
): { agent: PlayerType; ws: WebSocket } => {
  // TODO: Check that assignCharacter has the right inner context
  const characterId = assignCharacterId();
  const agent = {
    userId: agentId,
    characterId: characterId,
    score: 0,
    isBot: true,
    isScoreSaved: false,
    botsBusted: 0,
    correctGuesses: 0,
    votes: [],
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

  ee.on(matchEvent(roomId), (stream: ChatMessagePayload) => {
    console.log(stream);

    // This will be be a controller that listents to events and emmits the right action
    if (stream?.sender !== agent.userId) {
      // TODO: make async call to LLM Container
      // Mock async
      const cb = () => {
        ee.emit(matchEvent(roomId), {
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
