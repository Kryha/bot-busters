import { type FC } from "react";
import { Stack, Typography } from "@mui/material";
import { type CharacterName, type ChatMessage } from "~/types/index.js";

import { getTimeStamp } from "~/utils/date.js";
import { getCharacterAvatar } from "~/utils/characters.jsx";

import { styles } from "./styles.js";

interface Props {
  message: ChatMessage;
  characterName: CharacterName;
  color: string;
}

export const Message: FC<Props> = ({ message, color, characterName }) => {
  const isLocalSender = message.isLocalSender;
  const textColor = `${color}.dark`;
  const backgroundColor = `${color}.light`;
  const textAlign = isLocalSender ? "left" : undefined;
  const timeStamp = getTimeStamp(message.sentAt);

  return (
    <Stack sx={styles.messageContainer(isLocalSender)}>
      <Stack sx={styles.avatar}>
        {!isLocalSender && getCharacterAvatar(characterName)}
      </Stack>
      <Stack sx={styles.message(isLocalSender)}>
        <Stack sx={styles.messageSingle(backgroundColor, isLocalSender)}>
          <Typography variant="body1" color={textColor} sx={styles.username}>
            {characterName}
          </Typography>
          <Typography variant="body1" textAlign={textAlign}>
            {message.message}
          </Typography>
          <Stack>
            <Typography variant="caption" textAlign={"right"}>
              {timeStamp}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
