import { generateRandomString, verifySignature } from "@/utils/wallet";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db, dbSchema } from "@/server/db";
import { env } from "@/env.cjs";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    id: string;
    username?: string;
    address?: string;
  }
}

const credentialsProvider = CredentialsProvider({
  credentials: {
    address: {
      label: "Address",
      type: "text",
    },
    signedMessage: {
      label: "Signed Message",
      type: "text",
    },
  },

  async authorize(credentials) {
    const uuid = randomUUID();
    //TODO: make this name a random username
    const username = generateRandomString(32);

    if (!credentials?.signedMessage || !credentials?.address) {
      try {
        //TODO: Check if the random username already exists in the DB
        await db.insert(dbSchema.users).values({
          id: uuid,
          username: username,
        });
        return {
          id: uuid,
          username: username,
        };
      } catch (e) {
        console.error(e);
        return null;
      }
    }
    const { address, signedMessage } = credentials;
    const isVerified = verifySignature(address, signedMessage);

    //TODO: Return a proper error message when the signature is not verified
    if (!isVerified) return null;

    try {
      const selectedUser = await db.query.users.findFirst({
        where: eq(dbSchema.users.address, address),
      });

      if (!selectedUser) {
        await db.insert(dbSchema.users).values({
          id: uuid,
          username: username,
          address: address,
        });

        return {
          id: uuid,
          username: username,
          address: address,
        };
      }

      return {
        id: selectedUser.id,
        username: selectedUser.username,
        address: selectedUser.address,
      };
    } catch (e) {
      console.error(e);

      return null;
    }
  },
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  debug: env.NODE_ENV === "development",
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        id: token.sub,
      };
    },
  },
  providers: [credentialsProvider],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    newUser: "/",
  },
};
