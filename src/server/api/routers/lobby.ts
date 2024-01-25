import { observable } from "@trpc/server/observable";

import type { QueueUpdatePayload, ReadyToPlayPayload } from "~/types/index.js";

import { createTRPCRouter, protectedProcedure } from "../trpc.js";
import { ee, lobbyQueue } from "../match-maker.js";

export const lobbyRouter = createTRPCRouter({
  onQueueUpdate: protectedProcedure.subscription(({ ctx }) => {
    return observable<QueueUpdatePayload>((emit) => {
      const handleEvent = () => {
        const playerQueuePosition = lobbyQueue.indexOf(ctx.session.user.id) + 1;
        // emit data to client
        emit.next({
          playerQueuePosition,
          queueLength: lobbyQueue.length,
        });
      };

      ee.on("queueUpdate", handleEvent);

      return () => {
        ee.off("queueUpdate", handleEvent);

        const { id } = ctx.session.user;
        const index = lobbyQueue.indexOf(id);

        // If the user is in the queue, and they unsubscribe (disconnect), remove them from the queue
        if (index >= 0) {
          lobbyQueue.splice(index, 1);

          // Emit an event to notify others that the queue has been updated
          // This is to handle the case where a user leaves and the queue positions might change
          ee.emit("queueUpdate");
        }
      };
    });
  }),
  join: protectedProcedure.mutation(({ ctx }) => {
    const { id } = ctx.session.user;

    const hasJoined = lobbyQueue.includes(id);

    if (!hasJoined) {
      lobbyQueue.push(id);
    }

    const playerQueuePosition = lobbyQueue.indexOf(ctx.session.user.id) + 1;

    ee.emit("queueUpdate");
    return { playerQueuePosition, queueLength: lobbyQueue.length };
  }),

  onReadyToPlay: protectedProcedure.subscription(({ ctx }) => {
    return observable<ReadyToPlayPayload>((emit) => {
      const handleEvent = (payload: ReadyToPlayPayload) => {
        const isPlayer = payload.players.includes(ctx.session.user.id);

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
