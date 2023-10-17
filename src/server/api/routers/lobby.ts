import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// create a global event emitter (could be replaced by redis, etc)
const ee = new EventEmitter();

// TODO: improve or remove
const lobbyQueue: string[] = [];

export const lobbyRouter = createTRPCRouter({
  onJoin: protectedProcedure.subscription(() => {
    return observable<string>((emit) => {
      const handle = (data: string) => {
        emit.next(data);
      };
      ee.on("join", handle);
      return () => {
        ee.off("join", handle);
      };
    });
  }),
  join: protectedProcedure.mutation(({ ctx }) => {
    const { address } = ctx.session;
    lobbyQueue.push(address);
    ee.emit("join", address);
    return address;
  }),

  onLeave: protectedProcedure.subscription(() => {
    return observable<string>((emit) => {
      const handle = (data: string) => {
        emit.next(data);
      };
      ee.on("leave", handle);
      return () => {
        ee.off("leave", handle);
      };
    });
  }),
  leave: protectedProcedure.mutation(({ ctx }) => {
    const { address } = ctx.session;
    const index = lobbyQueue.indexOf(address);
    if (index < 0) return;
    lobbyQueue.splice(index, 1);
    ee.emit("leave", address);
    return address;
  }),
});
