import { observable } from "@trpc/server/observable";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { ee, lobbyQueue } from "@/server/api/match-maker";

interface ReadyToPlayPayload {
  players: [string, string];
  roomId: string;
}

interface QueueUpdatePayload {
  myPlaceInQueue: number;
  queueLength: number;
}

export const lobbyRouter = createTRPCRouter({
  onQueueUpdate: protectedProcedure.subscription(({ ctx }) => {
    return observable<QueueUpdatePayload>((emit) => {
      const handleEvent = () => {
        const myPlaceInQueue = lobbyQueue.indexOf(ctx.session.id) + 1;
        // emit data to client
        emit.next({
          myPlaceInQueue,
          queueLength: lobbyQueue.length,
        });
      };

      ee.on("queueUpdate", handleEvent);

      return () => {
        ee.off("queueUpdate", handleEvent);

        const { id } = ctx.session;

        const index = lobbyQueue.indexOf(id);
        if (index < 0) return;
        lobbyQueue.splice(index, 1);
      };
    });
  }),
  join: protectedProcedure.mutation(({ ctx }) => {
    const { id } = ctx.session;

    const hasJoined = lobbyQueue.includes(id);

    if (!hasJoined) {
      lobbyQueue.push(id);
    }

    const myPlaceInQueue = lobbyQueue.indexOf(ctx.session.id) + 1;

    ee.emit("queueUpdate");
    return { myPlaceInQueue, queueLength: lobbyQueue.length };
  }),

  onReadyToPlay: protectedProcedure.subscription(({ ctx }) => {
    return observable<ReadyToPlayPayload>((emit) => {
      const handleEvent = (payload: ReadyToPlayPayload) => {
        const isPlayer = payload.players.includes(ctx.session.id);

        if (isPlayer) {
          emit.next(payload);
        }
      };

      ee.on("readyToPlay", handleEvent);
      return () => {
        ee.off("readyToPlay", handleEvent);
      };
    });
  }),
});
