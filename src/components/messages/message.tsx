import { type FC } from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { type ChatMessage } from "~/types";

import { styles } from "./styles.js";
import { getTimeStamp } from "~/utils/date";

interface Props {
  message: ChatMessage;
  characterName: string;
  color: string;
}

export const Message: FC<Props> = ({ message, color, characterName }) => {
  const avatar = "../images/svg/alien.svg";
  const isLocalSender = message.isLocalSender;
  const textColor = `${color}.dark`;
  const backgroundColor = `${color}.light`;
  const textAlign = isLocalSender ? "left" : undefined;
  const timeStamp = getTimeStamp(message.sentAt);

  return (
    <Stack sx={styles.messageContainer(isLocalSender)}>
      {!isLocalSender && (
        <Avatar src={avatar} sx={styles.avatar} color={color} />
      )}
      <Stack sx={styles.message(isLocalSender)}>
        <Stack sx={styles.messageSingle(backgroundColor, isLocalSender)}>
          <Typography variant="body1" color={textColor} sx={styles.username}>
            {characterName}
          </Typography>
          <Typography variant="body1" textAlign={textAlign}>
            {message.message}
          </Typography>
          <Typography variant="caption" textAlign={"right"}>
            {timeStamp}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
