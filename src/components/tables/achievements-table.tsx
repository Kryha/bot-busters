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
import { Header } from "./components/index.js";
import { text } from "~/assets/text/index.js";
import { styles } from "./styles.js";

interface Props {
  playerProfile: LoggedUserProfileData;
}

//TODO: Add the achievements to the player profile
export const AchievementsTable: FC<Props> = ({ playerProfile }) => {
  if (!playerProfile) return;

  return (
    <TableContainer sx={styles.wrapper}>
      <Table sx={styles.table} aria-label="simple table">
        <Header cells={text.playerProfile.achievementColumns} />

        <TableBody>
          <TableRow sx={styles.tableRow}>
            <TableCell align="center">
              <Typography variant="body1" color="customGrey.main"></Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" color="customGrey.main"></Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
