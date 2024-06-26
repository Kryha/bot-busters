import { TRPCError } from "@trpc/server";
import { observable } from "@trpc/server/observable";

import type { QueueUpdatePayload, ReadyToPlayPayload } from "~/types/index.js";
import { lobbyQueue } from "~/server/service/index.js";
import { selectUserById } from "~/server/db/user.js";

import { createTRPCRouter, protectedProcedure } from "../trpc.js";
import { ee, getOngoingMatchByUserId } from "../match-maker.js";

export const lobbyRouter = createTRPCRouter({
  onQueueUpdate: protectedProcedure.subscription(({ ctx }) => {
    return observable<QueueUpdatePayload>((emit) => {
      const handleEvent = () => {
        const playerQueuePosition = lobbyQueue.getPlayerPosition(
          ctx.session.user.id,
        );
        // emit data to client
        emit.next({
          playerQueuePosition,
          queueLength: lobbyQueue.queue.length,
        });
      };

      ee.on("queueUpdate", handleEvent);

      return () => {
        ee.off("queueUpdate", handleEvent);

        const { id } = ctx.session.user;

        lobbyQueue.leave(id);

        ee.emit("queueUpdate");
      };
    });
  }),
  join: protectedProcedure.mutation(async ({ ctx }) => {
    const { id } = ctx.session.user;
    const user = await selectUserById(id);

    if (!user) throw new TRPCError({ code: "FORBIDDEN" });

    const joinCount = lobbyQueue.join(user);
    const userIsPlaying = !!getOngoingMatchByUserId(id);

    if (joinCount > 1 || userIsPlaying) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    ee.emit("queueUpdate");

    return {
      playerQueuePosition: lobbyQueue.getPlayerPosition(id),
      queueLength: lobbyQueue.queue.length,
    };
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
