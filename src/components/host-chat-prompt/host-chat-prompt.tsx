import { Stack, Typography } from "@mui/material";
import { type FC, useEffect, useState } from "react";

import { HOST_TYPING_SPEED } from "~/constants/index.js";

import { text } from "~/assets/text/index.js";
import { wait } from "~/utils/timer.js";

import { styles } from "./styles.js";

interface Props {
  stage: string;
  message?: string;
}

export const HostChatPrompt: FC<Props> = ({ stage, message }) => {
  const [writtenMessage, setWrittenMessage] = useState("");

  useEffect(() => {
    const write = async () => {
      if (!message) return;

      if (writtenMessage.length < message.length) {
        // wait time is longer in the beginning because of the character animation
        await wait(HOST_TYPING_SPEED);
        const nextChar = message[writtenMessage.length];

        if (!nextChar) return;
        setWrittenMessage(writtenMessage + nextChar);
      }
    };

    void write();
  }, [message, writtenMessage]);

  return (
    <Stack sx={styles.wrapper}>
      {stage === "chat" && (
        <Stack sx={styles.prompt}>
          <Typography variant="subtitle1" color="white">
            {text.chat.prompt}
          </Typography>
          <Typography variant="body1" color="white">
            {writtenMessage}
          </Typography>
        </Stack>
      )}

      {stage === "voting" && (
        <Typography sx={styles.chatTitle} variant="h6" color="white">
          {text.chat.chatHistory}
        </Typography>
      )}
    </Stack>
  );
};
