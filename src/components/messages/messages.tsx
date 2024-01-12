import { Stack } from "@mui/material";
import { type FC } from "react";

import { type ChatMessagePayload, type MessageData } from "~/types/index.js";
import { Prompt } from "~/components/prompt/index.js";

import { Message } from "./message.jsx";
import { styles } from "./styles.js";

interface Props {
  messageData: MessageData[];
  hostMessage?: ChatMessagePayload;
}

export const Messages: FC<Props> = ({ hostMessage, messageData }) => {
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
      {hostMessage && (
        <Prompt name={hostMessage.sender} message={hostMessage.message} />
      )}
    </Stack>
  );
};
