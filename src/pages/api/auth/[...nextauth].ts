import NextAuth from "next-auth";

import { authOptions } from "~/server/auth.js";

export default NextAuth(authOptions);
