import { type FC } from "react";
import { TableCell, TableHead, TableRow, Typography } from "@mui/material";

import { styles } from "./styles.js";

interface Props {
  cells: string[];
  cellsToAlign?: number;
}

export const Header: FC<Props> = ({ cells, cellsToAlign = 0 }) => {
  return (
    <TableHead>
      <TableRow sx={styles.tableRow}>
        {cells.map((cell, index) => (
          <TableCell
            key={index}
            sx={{ padding: 1, ...(index > cellsToAlign && styles.busterCell) }}
          >
            <Typography
              variant="body1"
              sx={{
                ...styles.tableHeader,
              }}
            >
              {cell}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
