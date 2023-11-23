import { type FC } from "react";
import { Message } from "./message";
import { Stack } from "@mui/material";
import { styles } from "./styles";
import { type GroupedMessage } from "@/types";
import { Prompt } from "@/features/chat/components";
import { text } from "@/features/chat/text";

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
