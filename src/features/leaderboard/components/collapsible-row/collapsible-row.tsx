import { type FC } from "react";
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { type Leaderboard } from "@/features/leaderboard/fake-data";
import { text } from "@/features/leaderboard/assets";

interface Props {
  open: boolean;
  leaderboard: Leaderboard;
}

export const CollapsibleRow: FC<Props> = ({ open, leaderboard }) => {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              {text.general.playerData}
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>{text.general.experience}</TableCell>
                  <TableCell>{text.general.victories}</TableCell>
                  <TableCell align="right">{text.general.losses}</TableCell>
                  <TableCell align="right">{text.general.address}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {leaderboard.extraInfo.experience}
                  </TableCell>
                  <TableCell>{leaderboard.extraInfo.lost}</TableCell>
                  <TableCell align="right">
                    {leaderboard.extraInfo.won}
                  </TableCell>
                  <TableCell align="right">{leaderboard.address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
