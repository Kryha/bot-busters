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

export const PlayerTable: FC<Props> = ({ playerProfile }) => {
  if (!playerProfile) return;

  return (
    <TableContainer sx={styles.wrapper}>
      <Table sx={styles.table} aria-label="simple table">
        <Header cells={text.playerProfile.profileColumns} />

        <TableBody>
          <TableRow sx={styles.tableRow}>
            <TableCell align="center">
              <Typography variant="body2" color="customGrey.main">
                {playerProfile.rank}
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body2" color="customGrey.main">
                {playerProfile.matchesPlayed}
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body2" color="customGrey.main">
                {playerProfile.score}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
