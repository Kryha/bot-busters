import { count, eq } from "drizzle-orm";
import { z } from "zod";
import { POINTS_ACHIEVEMENTS } from "~/constants/index.js";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc.js";
import { db } from "~/server/db/index.js";
import { ranks, users, usersToMatches } from "~/server/db/schema.js";
import { deleteUser, selectMatchPlayedByUser } from "~/server/db/user.js";
import {
  alreadyReceivedAchievement,
  leaderboard,
} from "~/server/service/index.js";
import { profanityFilter } from "~/service/index.js";
import { isValidSession } from "~/utils/session.js";
import { verifySignature } from "~/utils/wallet.js";

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
          return { isUsernameSet: !!loggedUser.username };
        }

        const score =
          duplicateUsers.reduce((acc, user) => acc + user.score, 0) +
          loggedUser.score;

        const [firstUser, ...usersToDelete] = duplicateUsers;

        // This section makes sure the logged in user does not get the achievement 201 twice.
        if (firstUser) {
          const matchesPlayedByUser = await selectMatchPlayedByUser(
            firstUser.id,
            tx,
          );

          const matchRooms = matchesPlayedByUser.map(
            (match) => match.match.room,
          );

          const hasAchievement = alreadyReceivedAchievement(
            firstUser.id,
            matchRooms,
            "201",
          );

          if (hasAchievement) {
            loggedUser.score -= POINTS_ACHIEVEMENTS["201"];
          }
        }
        usersToDelete.push(loggedUser);

        await tx
          .update(users)
          .set({ score })
          .where(eq(users.id, firstUser!.id));

        await Promise.all(
          usersToDelete.map((user) => deleteUser(user.id, firstUser!.id, tx)),
        );

        await leaderboard.calculate(tx);

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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;
      const { address, signature, username } = input;

      if (!isValidSession(session)) throw new Error("Invalid session");
      if (session.user.username) throw new Error("User already verified");
      if (profanityFilter.exists(username)) {
        throw new Error(
          "Username contains bad language please choose a different one",
        );
      }

      if (session.user.address) {
        await db.transaction(async (tx) => {
          await tx
            .update(users)
            .set({ username })
            .where(eq(users.id, session.user.id));
          await leaderboard.calculate(tx);
        });
        return;
      }

      if (!address || !signature) throw new Error("Missing required inputs");

      const isVerified = verifySignature(address, signature);
      if (!isVerified) throw new Error("Invalid signature");

      await db.transaction(async (tx) => {
        await db
          .update(users)
          .set({ username, address })
          .where(eq(users.id, session.user.id));
        await leaderboard.calculate(tx);
      });
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

  getRankedUsers: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        cursor: z.number().min(0).default(0),
      }),
    )
    .query(async ({ input }) => {
      const { cursor, limit } = input;

      const players = await db
        .select({
          id: users.id,
          username: users.username,
          score: users.score,
          matchesPlayed: count(usersToMatches.userId),
          rank: ranks.position,
        })
        .from(users)
        .innerJoin(ranks, eq(users.id, ranks.userId))
        .orderBy(ranks.position)
        .offset(cursor)
        .limit(limit)
        .innerJoin(usersToMatches, eq(users.id, usersToMatches.userId))
        .groupBy(users.id, ranks.position);

      const nextCursor = players.length + cursor;

      return { players, nextCursor };
    }),
});
