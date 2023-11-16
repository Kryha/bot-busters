import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  mergeUserScore,
  selectUserByAddress,
  selectUserById,
  setUsername,
} from "@/server/service";
import { isValidSession } from "@/utils/session";

//TODO: Fix import issue with SDK and TRPC.
// import { verifySignature } from "@/utils/wallet";
const verifySignature = (address: string, signedMessage: string): boolean => {
  return true;
};

export const userRouter = createTRPCRouter({
  mergeScore: protectedProcedure
    .input(z.object({ signature: z.string(), address: z.string() }))
    .output(z.object({ isKnownUser: z.boolean(), address: z.string() }))
    //TODO: Go over the function and make it more readable (separating the logic into smaller functions)
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const { signature, address } = input;

      const isVerified = verifySignature(address, signature);

      if (!isVerified) {
        throw new Error("Invalid signature");
      }

      const existingUser = await selectUserByAddress(address);

      if (!existingUser) {
        return { isKnownUser: false, address };
      }
      // TODO: Check if there is a username attached to the given address

      const isMerged = await mergeUserScore(id, existingUser.id);

      if (!isMerged) {
        throw new Error("Failed to merge user score");
      }
      return { isKnownUser: true, address };
    }),
  verify: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        address: z.string().optional(),
        signature: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isValidSession(ctx.session)) {
        throw new Error("Invalid session");
      }

      if (ctx.session.user.username) {
        throw new Error("User already verified");
      }

      const { username, address, signature } = input;

      if (ctx.session.user.address) {
        try {
          await setUsername(ctx.session.user.id, username);
        } catch (e) {
          throw new Error("Failed to update username try a different one");
        }
        return { isVerified: true };
      }

      if (!address || !signature) {
        throw new Error("No address or signature provided");
      }

      const isVerified = verifySignature(address, signature);

      if (!isVerified) {
        throw new Error("Invalid signature");
      }

      const updatedUser = await setUsername(ctx.session.user.id, username);
      if (!updatedUser) {
        throw new Error("Failed to update username");
      }

      return { isVerified: true };
    }),
  getUserById: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;

    const selectedUser = await selectUserById(id);
    return selectedUser;
  }),
});
