import { type FC } from "react";

import { Page } from "@/layouts";
import { Leaderboard } from "@/features";

const LeaderBoard: FC = () => {
  return (
    <Page>
      <Leaderboard />
    </Page>
  );
};

export default LeaderBoard;
