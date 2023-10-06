import { verifySignature } from "@/utils/verifying-signature";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        playerSign: {
          label: "Signature",
          type: "text",
        },
        message: {
          label: "Signed message",
          type: "text",
        },
      },
      authorize(credentials) {
        if (
          !credentials?.message ||
          !credentials?.playerSign ||
          !credentials?.publicKey
        ) {
          return null;
        }
        // TODO: Uncomment this line once Aleo SDK supports Node.js execution. (v0.6.0<)
        // await verifySignature(credentials.publicKey,credentials.message,credentials.playerSign);
        if (credentials) {
          return { id: credentials.publicKey };
        }
        return null;
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
