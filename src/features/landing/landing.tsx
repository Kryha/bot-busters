import { useState, type FC } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button, IconButton, Stack, SvgIcon, Typography } from "@mui/material";

import { text } from "@/assets/text";
import { api } from "@/utils/api";
import { pages } from "@/utils/router";
import { LeaderboardToggleButton, StartGame, UserStats } from "./components";
import { styles } from "./styles";
import { type LeaderboardType } from "@/types";
import { LeaderboardTable } from "@/components/tables";
import Image from "next/image";
import arrow from "public/images/svg/arrow.svg";
import { AddScoreTable } from "@/components/tables/add-score-table";
export const Landing: FC = () => {
  const [leaderboardType, setLeaderboardType] =
    useState<LeaderboardType>("today");

  return (
    <>
      <UserStats />
      <StartGame />
      <LeaderboardToggleButton
        leaderboardType={leaderboardType}
        setLeaderboardType={setLeaderboardType}
      />
      <LeaderboardTable />

      <AddScoreTable />
    </>
  );
};
