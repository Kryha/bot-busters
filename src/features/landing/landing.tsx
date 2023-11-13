import { type FC } from "react";
import { StartGame } from "./components";
import { LeaderBoard } from "@/features/leaderboard";

export const Landing: FC = () => {
  return (
    <>
      <StartGame />
      <LeaderBoard />
    </>
  );
};
