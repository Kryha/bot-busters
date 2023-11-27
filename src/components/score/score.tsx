import { type FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { type MatchStateType } from "~/types";

import { styles } from "./styles.js";
import { text } from "./text.js";

interface Props {
  matchState: MatchStateType;
}

export const Score: FC<Props> = ({ matchState }) => {
  if (matchState !== "results") return;

  return (
    <Stack sx={styles.container}>
      <Divider />
      <Stack sx={styles.score}>
        <Typography variant="body1">{text.yourScore}</Typography>
        <Typography variant="body1">{text.points1}</Typography>
      </Stack>
      <Divider />
    </Stack>
  );
};
