import { type FC } from "react";
import { Message } from "./message";
import { Stack } from "@mui/material";
import { styles } from "./styles";
import { type GroupedMessage } from "@/types";
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
