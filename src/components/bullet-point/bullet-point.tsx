import React, { type ReactNode, type FC } from "react";
import type { Variant } from "@mui/material/styles/createTypography.js";
import { type SxProps, type Theme, Typography, Stack } from "@mui/material";

import { styles } from "./styles.js";

export type BulletPointProps = { 
  variant?: Variant; 
  sxContainer?: SxProps<Theme>; 
  sxText?: SxProps<Theme>;
  text?: string;
  children?: ReactNode;
};

export const BulletPoint: FC<BulletPointProps> = ({ variant, sxContainer, sxText, text, children }) => (
  <Stack sx={{ ...styles.container, ...sxContainer }}>
    <Typography variant={variant} sx={styles.transformPointToBullet}>
      .
    </Typography>
    {text && (
      <Typography variant={variant} sx={{...styles.text, ...sxText}}>
        {text}
      </Typography>
    )}
    {children && children}
  </Stack>
);
