import { verifySignature } from "@/utils/wallet";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db, dbSchema } from "@/server/db";
import { env } from "@/env.cjs";
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
    session: ({ session, token }) => {
      return {
        ...session,
        publicKey: token.sub,
      };
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        aleoAddress: {
          label: "Public Key",
          type: "text",
        },
        signedMessage: {
          label: "Signed Message",
          type: "text",
        },
      },
      async authorize(credentials) {
        if (!credentials?.signedMessage || !credentials?.aleoAddress) {
          return null;
        }

        const { aleoAddress, signedMessage } = credentials;

        const isVerified = verifySignature(aleoAddress, signedMessage);

        if (!isVerified) return null;

        try {
          const selectedUsers = await db
            .select()
            .from(dbSchema.users)
            .where(eq(dbSchema.users.publicKey, aleoAddress));

          if (!selectedUsers.length) {
            await db.insert(dbSchema.users).values({ publicKey: aleoAddress });
          }

          return {
            id: aleoAddress,
          };
        } catch (e) {
          console.error(e);
          return null;
        }
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
