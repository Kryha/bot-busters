import { type FC } from "react";
import { styles } from "./styles";
import { Stack, StackProps, Typography } from "@mui/material";
import { GroupedMessage } from "../main-chat-view";

interface Props extends StackProps, GroupedMessage {
  messages?: string[];
}

export const MessageLocal: FC<Props> = ({ messages = [] }) => {
  return (
    <Stack sx={styles.messageLocalContainer}>
      <Stack sx={styles.messageLocal}>
        {messages.map((message, index) => {
          const key = `message-local-${index}`;

          return (
            <Stack key={key} className="" sx={styles.messageLocalSingle}>
              <Typography variant="body1" color="#2196F3" sx={styles.username}>
                you - username
              </Typography>
              <Typography variant="body1" textAlign="left">
                {message}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
