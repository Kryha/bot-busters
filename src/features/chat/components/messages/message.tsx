import { type FC } from "react";
import { styles } from "./styles";
import { Avatar, Stack, Typography } from "@mui/material";
import { type GroupedMessage } from "../main-chat-view";
import { text } from "../../text";

export const Message: FC<GroupedMessage> = ({ messages, isLocalSender }) => {
  const avatar = "../images/svg/alien.svg";
  const username = isLocalSender ? text.usernameLocal : text.username;
  const color = isLocalSender ? "#2196F3" : "#009688";
  const textAlign = isLocalSender ? "left" : undefined;

  return (
    <Stack sx={styles.messageContainer(isLocalSender)}>
      {!isLocalSender && <Avatar src={avatar} sx={styles.avatar} />}
      <Stack sx={styles.message(isLocalSender)}>
        {messages?.map((message, index) => {
          const key = `message-${index}`;

          return (
            <Stack key={key} sx={styles.messageSingle(isLocalSender)}>
              <Typography variant="body1" color={color} sx={styles.username}>
                {username}
              </Typography>
              <Typography variant="body1" textAlign={textAlign}>
                {message}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
