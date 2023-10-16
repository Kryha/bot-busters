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

import { type Leaderboard } from "@/types";
import { text } from "@/features/leaderboard/assets";
import { styles } from "./styles";

interface Props {
  open: boolean;
  leaderboard: Leaderboard;
}

export const CollapsibleRow: FC<Props> = ({ open, leaderboard }) => {
  // TODO: update styles and content
  return (
    <TableRow>
      <TableCell style={styles.mainTableCell} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={styles.box}>
            <Typography variant="h6" gutterBottom component="div">
              {text.playerInfo}
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableCellHeading}>
                    {text.address}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={styles.tableCellRow}>
                    {leaderboard.address}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
