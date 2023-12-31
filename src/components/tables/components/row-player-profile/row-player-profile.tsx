import { type FC } from "react";
import { TableCell, TableRow, Typography } from "@mui/material";

import { type PlayerProfileData } from "~/types/index.js";
import { text } from "~/assets/text/index.js";
import { formatDate, longDateFormat } from "~/utils/date.js";

import { Payout } from "./payout.jsx";
import { styles } from "./styles.js";

interface Props {
  playerProfile: PlayerProfileData;
}

export const RowPlayerProfile: FC<Props> = ({ playerProfile }) => {
  const isToday = formatDate(playerProfile.date) === "Today";
  const fontWeight = isToday ? "bold" : "light";
  const date = longDateFormat(playerProfile.date);

  return (
    <TableRow key={playerProfile.ranking} sx={styles.tableRow}>
      <TableCell component="th" scope="row">
        <Typography
          variant="body2"
          color="customGrey.main"
          fontWeight={fontWeight}
        >
          {date}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          color="customGrey.main"
          fontWeight={fontWeight}
        >
          {text.leaderboard.rankNumber(playerProfile.ranking)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          color="customGrey.main"
          fontWeight={fontWeight}
        >
          {playerProfile.gamesPlayed}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          color="customGrey.main"
          fontWeight={fontWeight}
        >
          {playerProfile.score}
        </Typography>
      </TableCell>
      <TableCell>
        <Payout payout={playerProfile.payout} fontWeight={fontWeight} />
      </TableCell>
    </TableRow>
  );
};
