import { useState } from "react";
import { useSession } from "next-auth/react";

import { type LeaderboardType } from "@/types";
import { isValidSession } from "@/utils/session";
import { AddScoreTable, LeaderboardTable } from "@/components/tables";
import { LeaderboardSelect } from "./components";
import { fakeCountdown } from "@/constants";

export const LeaderBoard = () => {
  const [leaderboardType, setLeaderboardType] =
    useState<LeaderboardType>("today");
  const { data: sessionData } = useSession();
  const isAuthenticated = isValidSession(sessionData);
  const isGamePlayed = true;

  return (
    <>
      <LeaderboardSelect
        leaderboardType={leaderboardType}
        setLeaderboardType={setLeaderboardType}
      />
      <LeaderboardTable />
      <AddScoreTable
        isAuthenticated={isAuthenticated}
        isGamePlayed={isGamePlayed}
        countdown={fakeCountdown}
      />
    </>
  );
};
