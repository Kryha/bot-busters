import { type FC } from "react";
import { Message } from "./message";
import { Stack } from "@mui/material";
import { styles } from "./styles";

// TODO: Fix types
export interface GroupedMessage {
  messages?: string[];
  isLocalSender?: boolean;
}

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
    </Stack>
  );
};
