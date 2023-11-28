import { type FC } from "react";
import { Avatar, Stack, Typography } from "@mui/material";

import { text } from "~/assets/text";
import { type LocalMessage } from "~/types";
import { styles } from "./styles.js";

interface Props {
  message: LocalMessage;
}

// TODO: quick test: will continue to fix in background bug update
export const Message: FC<Props> = ({ message }) => {
  const avatar = "../images/svg/alien.svg";
  const isLocalSender = message.isLocalSender;
  const username = isLocalSender
    ? text.chat.usernameLocal
    : text.general.username;
  const textColor = isLocalSender ? "#2196F3" : "#e38a8a";
  const textAlign = isLocalSender ? "left" : undefined;

  return (
    <Stack sx={styles.messageContainer(isLocalSender)}>
      {!isLocalSender && <Avatar src={avatar} sx={styles.avatar} />}
      <Stack sx={styles.message(isLocalSender)}>
        <Stack sx={styles.messageSingle(isLocalSender)}>
          <Typography variant="body1" color={textColor} sx={styles.username}>
            {username}
          </Typography>
          <Typography variant="body1" textAlign={textAlign}>
            {message.message}
          </Typography>
          <Typography variant="caption" textAlign={textAlign}>
            {message.sentAt}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
