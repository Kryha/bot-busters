import { Stack, Typography } from "@mui/material";
import { type FC } from "react";

import { styles } from "./styles.js";

interface Props {
  name: string;
  message: string;
}

export const Prompt: FC<Props> = ({ name, message }) => {
  return (
    <Stack sx={styles.wrapper}>
      <Typography variant="body1" color="blueGrey.main">
        {name}
      </Typography>
      <Typography variant="h4" color="blueGrey.main">
        {message}
      </Typography>
    </Stack>
  );
};
