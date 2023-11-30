import { Stack } from "@mui/material";
import { type FC } from "react";
import { text } from "~/assets/text";

import { Prompt } from "../prompt";
import { Message } from "./message";
import { styles } from "./styles.js";
import { type MessageData } from "~/types";

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
      <Prompt
        title={text.chat.firstPrompt.title}
        info={text.chat.firstPrompt.info}
      />
    </Stack>
  );
};
