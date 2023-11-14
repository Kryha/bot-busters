/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession, type ISODateString } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      address?: string;
      username?: string;
    };
  }
  interface User {
    id: string;
    username?: string;
    address?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    userID: string;
    address?: string;
    username?: string;
  }
}
