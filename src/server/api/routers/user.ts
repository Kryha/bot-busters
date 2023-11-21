import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { selectUserById, setUsername } from "@/server/service";
import { isValidSession } from "@/utils/session";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

//TODO: Fix import issue with SDK and TRPC and use verifySignature from utils
// import { verifySignature } from "@/utils/wallet";
const verifySignature = (_address: string, _signedMessage: string): boolean => {
  return true;
};

export const userRouter = createTRPCRouter({
  mergeScore: publicProcedure
    .input(z.object({ signature: z.string(), address: z.string() }))
    .mutation(async ({ input }) => {
      const { signature, address } = input;

      const isVerified = verifySignature(address, signature);
      if (!isVerified) throw new Error("Invalid signature");

      const txRes = await db.transaction(async (tx) => {
        const selectedUsers = await tx
          .select()
          .from(users)
          .where(eq(users.address, address))
          .orderBy(users.createdAt);

        switch (selectedUsers.length) {
          case 0: // no user found
            throw new Error("Users not found");
          case 1: // no duplicate user found
            return { isUsernameSet: !!selectedUsers.at(0)?.username };
          default: {
            // duplicate user found
            const [firstUser, ...duplicates] = selectedUsers;

            const score = selectedUsers.reduce(
              (acc, user) => acc + user.score,
              0
            );

            await tx
              .update(users)
              .set({ score })
              .where(eq(users.id, firstUser!.id));

            await Promise.all(
              duplicates.map((user) =>
                tx.delete(users).where(eq(users.id, user.id))
              )
            );

            return { isUsernameSet: !!firstUser?.username };
          }
        }
      });

      return txRes;
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
