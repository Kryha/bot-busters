import { Stack } from "@mui/material";
import { type FC } from "react";

import { type GroupedMessage } from "~/types/index.js";

import { text } from "../../text.js";
import { Prompt } from "../prompt/index.js";
import { Message } from "./message";
import { styles } from "./styles.js";

interface Props {
  messages: GroupedMessage[];
}

export const Messages: FC<Props> = ({ messages }) => {
  return (
    <Stack sx={styles.messagesContainer}>
      {messages.map(({ isLocalSender, messages }, index) => (
        <Message
          key={index}
          isLocalSender={isLocalSender}
          messages={messages}
        />
      ))}
      <Prompt title={text.firstPrompt.title} info={text.firstPrompt.info} />
    </Stack>
  );
};
