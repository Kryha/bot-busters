import {
  type DefaultSession,
  type NextAuthOptions,
  type Session,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifySignature } from "~/utils/wallet.js";
import { env } from "~/env.mjs";
import {
  insertAnonymousUser,
  insertUserWithAddress,
  selectUserByAddress,
} from "~/server/db/user.js";

declare module "next-auth" {
  interface User {
    id: string;
    username?: string;
    address?: string;
    coinbaseUuid?: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    address?: string;
    username?: string;
    coinbaseUuid?: string;
  }
}

const credentialsProvider = CredentialsProvider({
  credentials: {
    address: {
      label: "Address",
      type: "text",
    },
    signature: {
      label: "Signature",
      type: "text",
    },
  },

  async authorize(credentials) {
    try {
      // anonymous authentication
      if (!credentials?.signature || !credentials?.address) {
        const { id } = await insertAnonymousUser();
        return { id };
      }

      const { address, signature } = credentials;

      const isVerified = verifySignature(address, signature);
      if (!isVerified) throw new Error("Invalid signature");

      const user = await selectUserByAddress(address);

      // user has already been created
      if (user) {
        return {
          id: user.id,
          username: user.username ?? undefined,
          address: user.address ?? undefined,
          coinbaseUuid: user.coinbaseUuid ?? undefined,
        };
      }

      // user authenticating with wallet for the first time
      const newUser = await insertUserWithAddress(address);

      return {
        id: newUser.id,
        address: newUser.address ?? undefined,
        coinbaseUuid: newUser.coinbaseUuid ?? undefined,
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
    jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.address = user.address;
        token.username = user.username;
        token.coinbaseUuid = user.coinbaseUuid;
      }
      return token;
    },
    session: ({ session, token }): Session => {
      return {
        user: {
          id: token.userId,
          address: token.address,
          username: token.username,
          coinbaseUuid: token.coinbaseUuid,
        },
        expires: session.expires,
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
