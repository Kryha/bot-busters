import { type RouterOutput } from "~/server/api/root.js";

export type LoggedUserData = RouterOutput["user"]["getLoggedUser"];
export type LoggedUserProfileData =
  RouterOutput["user"]["getLoggedUserProfile"];
