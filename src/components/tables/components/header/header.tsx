import { type FC } from "react";
import { TableCell, TableHead, TableRow, Typography } from "@mui/material";

import { styles } from "./styles.js";

interface Props {
  cells: string[];
}

export const Header: FC<Props> = ({ cells }) => {
  return (
    <TableHead>
      <TableRow sx={styles.tableRow}>
        {cells.map((cell, index) => (
          <TableCell key={index} sx={{ padding: 1 }}>
            <Typography
              variant="body1"
              sx={{
                ...styles.tableHeader,
                ...(index === 1 && styles.busterCell),
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
