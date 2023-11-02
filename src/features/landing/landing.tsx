import { type FC } from "react";
import { useSession } from "next-auth/react";
import { isValidSession } from "@/utils/session";

import { fakeUsername } from "@/constants";
import { StartGame, UserStats } from "./components";
import { Timer } from "../chat/components/timer/timer";

export const Landing: FC = () => {
  const { data: sessionData } = useSession();
  const isAuthenticated = isValidSession(sessionData);
  const isGamePlayed = true;

  return (
    <>
      <UserStats
        isAuthenticated={isAuthenticated}
        isGamePlayed={isGamePlayed}
        username={fakeUsername}
      />
      <StartGame />

      <Timer matchDurationInSeconds={50} />
    </>
  );
};
