import { type FC } from "react";
import { Stack, Typography } from "@mui/material";
import { type CharacterName, type ChatMessage } from "~/types/index.js";

import { UserIcon } from "~/assets/icons/index.js";
import { styles } from "./styles.js";

interface Props {
  message: ChatMessage;
  characterName: CharacterName;
  color: string;
}

export const Message: FC<Props> = ({ message, color, characterName }) => {
  const isLocalSender = message.isLocalSender;
  const textAlign = isLocalSender ? "left" : undefined;

  return (
    <Stack sx={styles.messageContainer(isLocalSender)}>
      <Stack sx={styles.avatar(color)}>{!isLocalSender && <UserIcon />}</Stack>
      <Stack sx={styles.message(isLocalSender)}>
        <Stack sx={styles.messageSingle(color, isLocalSender)}>
          <Typography variant="body1" color="common.black" sx={styles.username}>
            {characterName}
          </Typography>
          <Typography variant="body1" textAlign={textAlign} sx={styles.text}>
            {message.message}
          </Typography>
        </Stack>
      </Stack>
      <Stack sx={styles.avatar(color)}>{isLocalSender && <UserIcon />}</Stack>
    </Stack>
  );
};
