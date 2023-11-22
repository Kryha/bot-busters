import { verifySignature } from "@/utils/wallet";
import {
  type Session,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env.cjs";
import {
  insertAnonymousUser,
  insertUserWithAddress,
  selectUserByAddress,
} from "@/server/service";

declare module "next-auth" {
  interface User {
    id: string;
    username?: string;
    address?: string;
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
        };
      }

      // user authenticating with wallet for the first time
      const newUser = await insertUserWithAddress(address);

      return {
        id: newUser.id,
        address: newUser.address ?? undefined,
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
      }
      return token;
    },
    session: ({ session, token }): Session => {
      return {
        user: {
          id: token.userId,
          address: token.address,
          username: token.username,
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
