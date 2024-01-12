import type { FC, ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { styles } from "~/components/navbar/styles.js";

interface Props {
  number: number,
  title: string,
  content: ReactNode,
};

export const NumberedTextSection: FC<Props> = ({ number, title, content }) => {
  return (
    <Stack sx={styles.container}>
      <Typography>
        {number}
      </Typography>
      <Stack sx={styles.wrapper}>
        <Typography>
          {title}
        </Typography>
        {content}
      </Stack>
    </Stack>
  );
};
