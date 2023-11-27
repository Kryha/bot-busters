import { type FC } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import { text } from "~/assets/text";
import { type LeaderboardType, leaderboardTypeSchema } from "~/types";
import { styles } from "./styles.js";
import { getRelativeDate } from "~/utils/date";

interface Props {
  leaderboardType: LeaderboardType;
  setLeaderboardType: (leaderboardType: LeaderboardType) => void;
}

export const LeaderboardSelect: FC<Props> = ({
  leaderboardType,
  setLeaderboardType,
}) => {
  const today = getRelativeDate(0);
  const yesterday = getRelativeDate(1);
  const twoDaysAgo = getRelativeDate(2);
  const threeDaysAgo = getRelativeDate(3);
  const fourDaysAgo = getRelativeDate(4);

  const handleChange = (event: SelectChangeEvent) => {
    const parsed = leaderboardTypeSchema.safeParse(event.target.value);
    if (!parsed.success) return;

    setLeaderboardType(parsed.data);
  };

  return (
    <FormControl sx={styles.formControl}>
      <Select
        value={leaderboardType}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        variant="outlined"
        MenuProps={{
          PaperProps: {
            sx: styles.select,
          },
          MenuListProps: {
            sx: styles.menuList,
          },
        }}
      >
        <MenuItem value="all-time" sx={styles.menuItem}>
          {text.leaderboard.allTimeLeaderboard}
        </MenuItem>
        <MenuItem value="today" sx={styles.menuItem}>
          {text.leaderboard.todaysLeaderboard(today)}
        </MenuItem>
        <MenuItem value="yesterday" sx={styles.menuItem}>
          {text.leaderboard.yesterdaysLeaderboard(yesterday)}
        </MenuItem>
        <MenuItem value="two-days-ago" sx={styles.menuItem}>
          {text.leaderboard.leaderboardOf(twoDaysAgo)}
        </MenuItem>
        <MenuItem value="three-days-ago" sx={styles.menuItem}>
          {text.leaderboard.leaderboardOf(threeDaysAgo)}
        </MenuItem>
        <MenuItem value="four-days-ago" sx={styles.menuItem}>
          {text.leaderboard.leaderboardOf(fourDaysAgo)}
        </MenuItem>
      </Select>
    </FormControl>
  );
};
