import { type FC } from "react";
import { useSession } from "next-auth/react";
import { isValidSession, isVerifiedSession } from "@/utils/session";

import { fakeUsername } from "@/constants";
import { StartGame, UserStats } from "./components";
import { LeaderBoard } from "@/features/leaderboard";

export const Landing: FC = () => {
  const { data: sessionData } = useSession();
  const isAuthenticated = isValidSession(sessionData);
  const isWalledConnected = isVerifiedSession(sessionData);
  const isGamePlayed = true;

  return (
    <>
      {isAuthenticated && <a>Is Authenticated</a>}
      <UserStats
        isWalletConnected={isWalledConnected}
        isGamePlayed={isGamePlayed}
        username={fakeUsername}
      />
      <StartGame />
      <LeaderBoard />
    </>
  );
};
