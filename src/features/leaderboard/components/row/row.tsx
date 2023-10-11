import { useState, type FC } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Avatar,
  IconButton,
  Stack,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { CollapsibleRow } from "../collapsible-row";
import { type Leaderboard } from "@/features/leaderboard/fake-data";

interface Props {
  leaderboard: Leaderboard;
}

export const Row: FC<Props> = ({ leaderboard }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {/* <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 8 }}> */}
          <Typography variant="h2">{leaderboard.rank}</Typography>
        </TableCell>
        {/* </Stack> */}
        <TableCell component="th" scope="row">
          <Avatar
            alt="player avatar"
            src={leaderboard.avatar}
            // sx={{ width: "140px", height: "140px" }}
          />
        </TableCell>

        <TableCell>
          <Typography variant="h3">{leaderboard.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h4">{leaderboard.score}</Typography>
        </TableCell>
      </TableRow>
      <CollapsibleRow open={open} leaderboard={leaderboard} />
    </>
  );
};
