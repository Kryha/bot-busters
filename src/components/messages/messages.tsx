import { Stack } from "@mui/material";
import { type FC } from "react";

import { type MessageData } from "~/types/index.js";

import { Message } from "./message.jsx";
import { styles } from "./styles.js";

interface Props {
  messageData: MessageData[];
}

export const Messages: FC<Props> = ({ messageData }) => {
  return (
    <Stack sx={styles.messagesContainer}>
      {messageData.map(({ message, character }, index) => (
        <Message
          key={index}
          message={message}
          color={character.color}
          characterName={character.name}
        />
      ))}
    </Stack>
  );
};
