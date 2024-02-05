import type { FC, ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

import { styles } from "~/components/numbered-text-section/styles.js";

interface Props {
  number: number;
  title: string;
  content: ReactNode;
}
/**
 * Renders a number and title on top of the content prop
 */
export const NumberedSection: FC<Props> = ({ number, title, content }) => {
  return (
    <Stack sx={styles.container}>
      <Typography variant="h2" sx={styles.number}>
        {number}
      </Typography>
      <Stack sx={styles.column}>
        <Typography variant="body1" sx={styles.title}>
          {title}
        </Typography>
          <>{content}</>
      </Stack>
    </Stack>
  );
};
