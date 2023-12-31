import { Stack, Typography } from "@mui/material";
import { type FC } from "react";

import { styles } from "./styles.js";

interface Props {
  title: string;
  info: string;
}

export const Prompt: FC<Props> = ({ title, info }) => {
  return (
    <Stack sx={styles.wrapper}>
      <Typography variant="body1" color="blueGrey.main">
        {title}
      </Typography>
      <Typography variant="h4" color="blueGrey.main">
        {info}
      </Typography>
    </Stack>
  );
};
