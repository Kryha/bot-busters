import { type FC } from "react";

import { StartGame, UserStats } from "./components";
import { useSession } from "next-auth/react";
import { isValidSession } from "@/utils/session";
import { text } from "@/assets/text";

export const Landing: FC = () => {
  const { data: sessionData } = useSession();
  const isAuthenticated = isValidSession(sessionData);
  const isGamePlayed = true;

  return (
    <>
      <UserStats
        isAuthenticated={isAuthenticated}
        isGamePlayed={isGamePlayed}
        username={text.landing.fakeUsername}
      />
      <StartGame />
    </>
  );
};
