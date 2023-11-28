import { type FC } from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { type GroupedMessage } from "~/types";
import { styles } from "./styles.js";
import { getTimeStamp } from "~/utils/date";

interface Props {
  message: GroupedMessage;
}

// TODO: quick test: will continue to fix in background bug update
export const Message: FC<Props> = ({ message }) => {
  const avatar = "../images/svg/alien.svg";
  const isLocalSender = message.isLocalSender;
  const textColor = `${message.color}.dark`;
  const backgroundColor = `${message.color}.light`;
  const textAlign = isLocalSender ? "left" : undefined;
  const timeStamp = getTimeStamp(message.sentAt);

  return (
    <Stack sx={styles.messageContainer(isLocalSender)}>
      {!isLocalSender && (
        <Avatar src={avatar} color={message.color} sx={styles.avatar} />
      )}
      <Stack sx={styles.message(isLocalSender)}>
        <Stack sx={styles.messageSingle(backgroundColor, isLocalSender)}>
          <Typography variant="body1" color={textColor} sx={styles.username}>
            {message.username}
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
