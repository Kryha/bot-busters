import { type FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import { type LoggedUserProfileData } from "~/types/index.js";
import { text } from "~/assets/text/index.js";

import { styles } from "./styles.js";
import { Header } from "./components/index.js";

interface Props {
  playerProfile: LoggedUserProfileData;
}

const COLUMN_WIDTH = { sm: "8.6%", md: "15.5%", lg: "30%" };

export const PlayerTable: FC<Props> = ({ playerProfile }) => {
  if (!playerProfile) return;

  return (
    <TableContainer sx={styles.wrapper}>
      <Table sx={styles.table} aria-label="simple table">
        <colgroup>
          <col width={COLUMN_WIDTH.lg} />
          <col width={COLUMN_WIDTH.sm} />
          <col width={COLUMN_WIDTH.md} />
          <col width={COLUMN_WIDTH.md} />
          <col width={COLUMN_WIDTH.sm} />
        </colgroup>
        <Header cells={text.playerProfile.profileColumns} />
        <TableBody>
          <TableRow sx={styles.tableRow}>
            <TableCell align="left">
              <Typography variant="body1" color="common.white">
                {playerProfile.username ?? "Anonymous"}
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body1" color="common.white">
                {playerProfile.matchesPlayed}
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body1" color="common.white">
                {playerProfile.rank}
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body1" color="customGrey.main"></Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body1" color="common.white">
                {playerProfile.score}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
