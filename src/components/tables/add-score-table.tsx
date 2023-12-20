import { type FC } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";

import { text } from "~/assets/text/index.js";
import { leaderboardData } from "~/constants/index.js";

import { COLUMN_WIDTH } from "./constants.js";
import { styles } from "./styles.js";
import { RowAddScore, Top100SVG } from "./components/index.js";

interface Props {
  isAuthenticated: boolean;
  isGamePlayed: boolean;
  countdown: string | number;
}

export const AddScoreTable: FC<Props> = ({
  isAuthenticated,
  isGamePlayed,
  countdown,
}) => {
  const isNotLoggedInOrPlayed = !isAuthenticated && !isGamePlayed;

  if (!leaderboardData[2]) return;

  return (
    <Stack sx={styles.addScoreWrapper}>
      <Top100SVG />

      <Stack sx={styles.addScoreContainer(isGamePlayed)}>
        <TableContainer sx={styles.table}>
          <Table sx={styles.table} aria-label="simple table">
            <colgroup>
              <col width={COLUMN_WIDTH.sm} />
              <col width={COLUMN_WIDTH.lg} />
              <col width={COLUMN_WIDTH.md} />
              <col width={COLUMN_WIDTH.md} />
              <col width={COLUMN_WIDTH.md} />
            </colgroup>
            <TableBody sx={styles.addScoreBody(isNotLoggedInOrPlayed)}>
              <RowAddScore
                leaderboard={leaderboardData[2]}
                isGamePlayed={isGamePlayed}
                isAuthenticated={isAuthenticated}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="body2"
          color="customGrey.main"
          sx={styles.countdown}
        >
          {text.leaderboard.countdown(countdown)}
        </Typography>
      </Stack>
    </Stack>
  );
};
