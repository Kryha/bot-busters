import React, { type FC, type ReactNode } from "react";
import type { Variant } from "@mui/material/styles/createTypography.js";
import { Stack, type SxProps, type Theme, Typography } from "@mui/material";

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
  <Stack sx={{ ...styles.container, ...sxContainer }}>
    {/* transform dot symbol to bullet point */}
    <li>
      {/* render text if present */}
      {text && (
        <Typography variant={variant} sx={{ ...styles.text, ...sxText }}>
          {text}
        </Typography>
      )}

      {/* render children if present */}
      <Stack sx={styles.childContainer}>{children && children}</Stack>
    </li>
  </Stack>
);
