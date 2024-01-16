import { Stack, Typography } from "@mui/material";
import { type FC } from "react";

import { styles } from "./styles.js";
import { text } from "~/assets/text/index.js";

interface Props {
  stage: string;
  name: string | undefined;
  message: string | undefined;
}

export const Prompt: FC<Props> = ({ stage, name, message }) => {
  return (
    <Stack sx={styles.wrapper}>
      {stage === "chat" && name && message && (
        <>
          <Typography variant="subtitle1" color="white">
            {name}:
          </Typography>
          <Typography variant="body1" color="white">
            {message}
          </Typography>
        </>
      )}
      {stage === "voting" && (
        <Typography sx={styles.chatTitle} variant="h6" color="white">
          {text.chat.chatHistory}
        </Typography>
      )}
    </Stack>
  );
};
