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

/**
 * Renders a bulletpoint component, usage:
 * - bullet point only: no props
 * - bullet point + simple text: pass text using "text"
 * - bullet point + custom component: wrap component within <BulletPoint> tags
 * - [not recommended] bullet point + simple text + custom component: use "text" prop & wrap component within <BulletPoint> tags
 *
 * (variant + container/text sx props are available to override styles)
 */
export const BulletPoint: FC<BulletPointProps> = ({
  variant,
  sxContainer,
  sxText,
  text,
  children,
}) => (
  // simple row container
  <Stack sx={{ ...styles.container, ...sxContainer }}>
    {/* transforms the dot symbol to a bullet */}
    <Typography variant={variant} sx={styles.transformPointToBullet}>
      .
    </Typography>
    {/* render text if present */}
    {text && (
      <Typography variant={variant} sx={{ ...styles.text, ...sxText }}>
        {text}
      </Typography>
    )}
    {/* render children if present */}
    <Stack sx={styles.childContainer}>{children && children}</Stack>
  </Stack>
);
