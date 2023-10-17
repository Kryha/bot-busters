import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// create a global event emitter (could be replaced by redis, etc)
const ee = new EventEmitter();

// TODO: improve or remove
const lobbyQueue: string[] = [];

export const lobbyRouter = createTRPCRouter({
  onJoin: protectedProcedure.subscription(({ ctx }) => {
    return observable<string>((emit) => {
      const handleEvent = (address: string) => {
        // emit data to client
        emit.next(address);
      };

      ee.on("join", handleEvent);
      return () => {
        ee.off("join", handleEvent);

        const { address } = ctx.session;

        console.log(address, "leaving...");

        const index = lobbyQueue.indexOf(address);
        if (index < 0) return;
        lobbyQueue.splice(index, 1);
      };
    });
  }),
  join: protectedProcedure.mutation(({ ctx }) => {
    const { address } = ctx.session;

    const hasJoined = lobbyQueue.indexOf(address) !== -1;
    if (hasJoined) return address;

    lobbyQueue.push(address);
    ee.emit("join", address);
    return address;
  }),
});
