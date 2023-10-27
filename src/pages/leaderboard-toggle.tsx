import { useState, type MouseEvent } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { text } from "@/assets/text";

type LeaderboardTime = "today" | "all-time";
export const LeaderboardToggleButton = () => {
  const [alignment, setAlignment] = useState<LeaderboardTime>("today");

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: LeaderboardTime
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ mb: 5 }}
    >
      <ToggleButton value="today" size="small" sx={{ p: "0px 16px" }}>
        {text.landing.todaysLeaderboard}
      </ToggleButton>
      <ToggleButton value="all-time" size="small" sx={{ p: "0px 16px" }}>
        {text.landing.allTimeLeaderboard}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
