import { type FC } from "react";
import { Message } from "./message";
import { Stack } from "@mui/material";
import { styles } from "./styles";
import { type GroupedMessage } from "@/types";
import { Prompt } from "@/features/chat/components";
import { text } from "@/features/chat/text";

interface Props {
  groupedMessages: GroupedMessage[];
}

export const Messages: FC<Props> = ({ groupedMessages }) => {
  return (
    <Stack sx={styles.messagesContainer}>
      {groupedMessages.map(({ isLocalSender, messages }, index) => (
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
