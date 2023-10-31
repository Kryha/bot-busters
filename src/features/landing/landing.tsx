import { useState, type FC } from "react";

import { type LeaderboardType } from "@/types";
import { LeaderboardTable, AddScoreTable } from "@/components/tables";
import { LeaderboardToggleButton, StartGame, UserStats } from "./components";
import { useSession } from "next-auth/react";
import { isValidSession } from "@/utils/session";
import { text } from "@/assets/text";

export const Landing: FC = () => {
  const [leaderboardType, setLeaderboardType] =
    useState<LeaderboardType>("today");
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
      <LeaderboardToggleButton
        leaderboardType={leaderboardType}
        setLeaderboardType={setLeaderboardType}
      />
      <LeaderboardTable />
      <AddScoreTable
        isAuthenticated={isAuthenticated}
        isGamePlayed={isGamePlayed}
        countdown={text.landing.fakeCountdown}
      />
    </>
  );
};
