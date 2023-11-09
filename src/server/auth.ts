import { verifySignature } from "@/utils/wallet";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env.cjs";
import {
  insertAnonymousUsers,
  insertUserWithAddress,
  selectUserByAddress,
} from "@/server/service";

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
    try {
      // unverified authentication
      if (!credentials?.signedMessage || !credentials?.address) {
        const newUser = await insertAnonymousUsers();
        if (!newUser) return null;

        return { id: newUser.id };
      }

      // verified authentication
      const { address, signedMessage } = credentials;
      const isVerified = verifySignature(address, signedMessage);

      if (!isVerified) return null;

      const verifiedUser = await selectUserByAddress(address);

      if (verifiedUser) {
        if (!verifiedUser.address) return null;
        if (!verifiedUser.id) return null;
        if (!verifiedUser.username) {
          return {
            id: verifiedUser.id,
            address: verifiedUser.address,
          };
        }
        return {
          id: verifiedUser.id,
          username: verifiedUser.username,
          address: verifiedUser.address,
        };
      }

      // user authenticating with wallet for the first time
      const newUserWithAddress = await insertUserWithAddress(address);
      if (!newUserWithAddress) return null;
      if (!newUserWithAddress.address) return null;

      return {
        id: newUserWithAddress.id,
        address: newUserWithAddress.address,
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
