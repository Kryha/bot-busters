import { type FC } from "react";
import { useSession } from "next-auth/react";
import { isValidSession, isVerifiedSession } from "@/utils/session";

import { fakeUsername } from "@/constants";
import { StartGame, UserStats } from "./components";
import { LeaderBoard } from "@/features/leaderboard";
import { api } from "@/utils/api";

export const Landing: FC = () => {
  const { data: sessionData } = useSession();
  const isAuthenticated = isValidSession(sessionData);
  const isWalledConnected = isVerifiedSession(sessionData);
  const isGamePlayed = true;
  const { data } = api.user.getUserById.useQuery();
  const getInfo = () => {
    return `Is Authenticated with this ID: ${sessionData?.id} with score ${data?.score} `;
  };

  return (
    <>
      {isAuthenticated && <a>{getInfo()}</a>}
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
