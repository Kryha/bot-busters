import React, { type FC } from "react";
import type { Variant } from "@mui/material/styles/createTypography.js";
import { type SxProps, type Theme, Typography, Stack } from "@mui/material";

import { styles } from "./styles.js";

type Props = { variant?: Variant; sx?: SxProps<Theme>; text?: string };

export const BulletPoint: FC<Props> = ({ variant, sx, text }) => (
  <Stack sx={{ ...styles.container, ...sx }}>
    <Typography variant={variant} sx={styles.transformPointToBullet}>
      .
    </Typography>
    {text && (
      <Typography variant={variant} sx={styles.text}>
        {text}
      </Typography>
    )}
  </Stack>
);
