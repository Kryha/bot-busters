import type { FC, ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

import { styles } from "~/components/numbered-text-section/styles.js";

interface Props {
  number: number,
  title: string,
  content: ReactNode,
};

export const NumberedTextSection: FC<Props> = ({ number, title, content }) => {
  return (
    <Stack sx={styles.container}>
      <Typography variant="h2" sx={styles.largeNumber}>
        {number}
      </Typography>
      <Stack sx={styles.column}>
        <Typography variant="body1" sx={styles.title}>
          {title}
        </Typography>
        {content}
      </Stack>
    </Stack>
  );
};
