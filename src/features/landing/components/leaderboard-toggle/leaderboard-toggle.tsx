import { type FC } from "react";
import { Button, ButtonGroup } from "@mui/material";

import { text } from "@/assets/text";
import { styles } from "./styles";
import { type LeaderboardType } from "@/types";

interface Props {
  leaderboardType: LeaderboardType;
  setLeaderboardType: (leaderboardType: LeaderboardType) => void;
}

export const LeaderboardToggleButton: FC<Props> = ({
  leaderboardType,
  setLeaderboardType,
}) => {
  const variantToday = leaderboardType === "today" ? "contained" : "outlined";
  const variantAllTime = leaderboardType === "today" ? "outlined" : "contained";

  return (
    <ButtonGroup sx={styles.buttonGroup} color="customGrey">
      <Button
        variant={variantToday}
        size="small"
        sx={styles.button}
        onClick={() => setLeaderboardType("today")}
      >
        {text.landing.todaysLeaderboard}
      </Button>
      <Button
        variant={variantAllTime}
        size="small"
        sx={styles.button}
        onClick={() => setLeaderboardType("all-time")}
      >
        {text.landing.allTimeLeaderboard}
      </Button>
    </ButtonGroup>
  );
};
