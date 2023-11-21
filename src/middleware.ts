export { default } from "next-auth/middleware";

import { pages } from "@/utils/router";

export const config = {
  matcher: [
    pages.lobby,
    pages.match,
    pages.playerProfile,
    pages.usernameSelect,
  ],
};
