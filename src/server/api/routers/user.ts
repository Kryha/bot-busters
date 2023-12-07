import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc.js";
import { db } from "~/server/db/index.js";
import { users } from "~/server/db/schema.js";
import { isValidSession } from "~/utils/session.js";
import { verifySignature } from "~/utils/wallet.js";
import { profanityFilter } from "~/service/index.js";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  mergeScore: protectedProcedure
    .input(z.object({ signature: z.string(), address: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;
      const { signature, address } = input;

      const isVerified = verifySignature(address, signature);
      if (!isVerified) throw new Error("Invalid signature");

      const txRes = await db.transaction(async (tx) => {
        const [loggedUser] = await tx
          .select()
          .from(users)
          .where(eq(users.id, session.user.id));

        if (!loggedUser) throw new Error("User not found");

        const duplicateUsers = await tx
          .select()
          .from(users)
          .where(eq(users.address, address))
          .orderBy(users.createdAt)
          .then((users) => users.filter((user) => user.id !== loggedUser.id));

        if (duplicateUsers.length === 0) {
          return { isUsernameSet: !!duplicateUsers.at(0)?.username };
        }

        const score =
          duplicateUsers.reduce((acc, user) => acc + user.score, 0) +
          loggedUser.score;

        const [firstUser, ...usersToDelete] = duplicateUsers;

        usersToDelete.push(loggedUser);

        await tx
          .update(users)
          .set({ score })
          .where(eq(users.id, firstUser!.id));

        await Promise.all(
          usersToDelete.map((user) =>
            tx.delete(users).where(eq(users.id, user.id))
          )
        );

        return { isUsernameSet: !!firstUser?.username };
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
      const { session } = ctx;
      const { address, signature, username } = input;

      if (!isValidSession(session)) throw new Error("Invalid session");
      if (session.user.username) throw new Error("User already verified");
      if (profanityFilter.exists(username)) {
        throw new Error(
          "Username contains bad language please choose a different one"
        );
      }

      if (session.user.address) {
        await db
          .update(users)
          .set({ username })
          .where(eq(users.id, session.user.id));
        return;
      }

      if (!address || !signature) throw new Error("Missing required inputs");

      const isVerified = verifySignature(address, signature);
      if (!isVerified) throw new Error("Invalid signature");

      await db
        .update(users)
        .set({ username, address })
        .where(eq(users.id, session.user.id));
    }),

  getUserById: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;

    const [selectedUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    if (!selectedUser) throw new Error("User not found");

    return selectedUser;
  }),
});
