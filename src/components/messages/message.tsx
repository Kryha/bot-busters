import { type FC } from "react";
import { Stack, Typography } from "@mui/material";
import { type ChatMessage } from "~/types/index.js";

import { styles } from "./styles.js";
import { getTimeStamp } from "~/utils/date.js";
import { Ash, Dot, Eve, Hal, Roy } from "~/assets/characters/index.js";

interface Props {
  message: ChatMessage;
  characterName: string;
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
        {!isLocalSender && getCharacter(characterName)}
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

const getCharacter = (characterName: string) => {
  switch (characterName) {
    case "hal":
      return <Hal />;
    case "ash":
      return <Ash />;
    case "roy":
      return <Roy />;
    case "eve":
      return <Eve />;
    case "dot":
      return <Dot />;
    default:
      return <Hal />;
  }
};
