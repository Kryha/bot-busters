import { type FC } from "react";
import {
  Stack,
  type SxProps,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import { type RankedUser } from "~/types/index.js";
import { BotArrowIcon } from "~/assets/icons/index.js";
import { styles } from "./styles.js";

interface Props {
  rankedUser: RankedUser;
  isBlurred?: boolean;
  userRow?: boolean;
}

export const RowLeaderboard: FC<Props> = ({
  rankedUser,
  isBlurred,
  userRow,
}) => {
  const cellStyle = {
    ...styles.cell,
    ...(userRow && styles.userCell),
  };
  const rankingCellStyle = {
    ...styles.ranking,
    ...(userRow && styles.userCell),
  } as SxProps;

  return (
    <TableRow key={rankedUser.rank.toString()} sx={styles.tableRow(isBlurred)}>
      <TableCell component="td" scope="row">
        <Stack sx={styles.rank}>
          {userRow && <BotArrowIcon style={{ marginRight: "20px" }} />}
          <Typography
            variant="body1"
            sx={rankingCellStyle}
            color="customGrey.main"
          >
            {rankedUser.rank}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Stack sx={styles.container}>
          <Typography variant="body1" sx={cellStyle} color="customGrey.main">
            {rankedUser.username}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body1" sx={cellStyle} color="customGrey.main">
          {rankedUser.matchesPlayed}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body1" sx={cellStyle} color="customGrey.main">
          {rankedUser.score}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
