import { TableHead, TableRow, TableCell } from "@mui/material";
import { text } from "@/features/leaderboard/assets";

export const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>{text.general.rank}</TableCell>
        <TableCell align="right">{text.general.name}</TableCell>
        <TableCell align="right">{text.general.score}</TableCell>
      </TableRow>
    </TableHead>
  );
};
