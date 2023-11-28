import { Stack } from "@mui/material";
import { type FC } from "react";
import { type GroupedMessage } from "~/types";
import { Prompt } from "../prompt";
import { Message } from "./message";
import { styles } from "./styles.js";
import { text } from "~/assets/text";

interface Props {
  messages: GroupedMessage[];
}

export const Messages: FC<Props> = ({ messages }) => {
  return (
    <Stack sx={styles.messagesContainer}>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <Prompt
        title={text.chat.firstPrompt.title}
        info={text.chat.firstPrompt.info}
      />
    </Stack>
  );
};
