import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db, dbSchema } from "@/server/db";
import { env } from "@/env.mjs";
import { eq } from "drizzle-orm";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    publicKey: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  debug: env.NODE_ENV === "development",
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      publicKey: token.sub,
    }),
  },
  providers: [
    CredentialsProvider({
      credentials: {
        publicKey: {
          label: "Public Key",
          type: "text",
        },
      },
      async authorize(credentials) {
        if (!credentials?.publicKey) return null;
        // TODO: add signature verification

        const selectedUsers = await db
          .select()
          .from(dbSchema.users)
          .where(eq(dbSchema.users.publicKey, credentials.publicKey));

        if (!selectedUsers.length) {
          await db
            .insert(dbSchema.users)
            .values({ publicKey: credentials.publicKey });
        }

        return {
          id: credentials.publicKey,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    newUser: "/",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
