import { type FC } from "react";
import { styles } from "./styles";
import { Avatar, Stack, type StackProps, Typography } from "@mui/material";
import { type GroupedMessage } from "../main-chat-view";

interface Props extends StackProps, GroupedMessage {
  messages?: string[];
}

export const Message: FC<Props> = ({ messages }) => {
  const avatar = "../images/svg/alien.svg";

  return (
    <Stack sx={styles.messageContainer}>
      <Avatar src={avatar} sx={styles.avatar} />
      <Stack sx={styles.message}>
        {messages?.map((message, index) => {
          const key = `message-${index}`;

          return (
            <Stack key={key} sx={styles.messageSingle}>
              <Typography variant="body1" color="#009688" sx={styles.username}>
                username
              </Typography>
              <Typography variant="body1">{message}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
