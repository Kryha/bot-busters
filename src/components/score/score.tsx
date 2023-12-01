import { type FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";
import { text } from "./text.js";

interface Props {
  correctGuesses: number;
  gainedScore: number;
}

export const Score: FC<Props> = ({ correctGuesses, gainedScore }) => {
  return (
    <Stack sx={styles.container}>
      <Divider />
      <Stack sx={styles.score}>
        <Typography variant="body1">
          {text.yourScore(correctGuesses)}
        </Typography>
        <Typography variant="body1">{text.points(gainedScore)}</Typography>
      </Stack>
      <Divider />
    </Stack>
  );
};
