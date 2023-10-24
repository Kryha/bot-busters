import { type FC } from "react";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";

import { LeaderBoardItem } from "@/features/leaderboard/components";

import { type LeaderboardData } from "@/types";
import { styles } from "./styles";
import { text } from "@/features/leaderboard/assets";

interface Props {
  leaderboard: LeaderboardData[];
}

export const LeaderboardList: FC<Props> = ({ leaderboard }) => {
  // TODO: update styles and content
  return (
    <List sx={styles.list}>
      <Box sx={styles.box}>
        <ListItem
          disablePadding
          sx={styles.list}
          secondaryAction={
            <Typography variant="h5" color="primary.main">
              {text.score}
            </Typography>
          }
        />
        {leaderboard.map((data, index) => (
          <>
            <LeaderBoardItem leaderboard={data} key={index} />
            <Divider variant="inset" component="li" sx={styles.divider} />
          </>
        ))}
      </Box>
    </List>
  );
};
