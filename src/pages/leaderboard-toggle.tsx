import { useState, type MouseEvent } from "react";
import {
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
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
    <ButtonGroup variant="outlined" sx={{ width: "590px", mb: 5 }}>
      <Button
        variant="contained"
        size="small"
        sx={{ p: "0px 16px", borderRadius: 1, flex: "1 0 0" }}
      >
        {text.landing.todaysLeaderboard}
      </Button>
      <Button
        variant="outlined"
        size="small"
        sx={{ p: "0px 16px", flex: "1 0 0" }}
      >
        {text.landing.allTimeLeaderboard}
      </Button>
    </ButtonGroup>
  );
};
