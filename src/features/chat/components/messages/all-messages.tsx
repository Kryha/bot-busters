import { type GroupedMessage } from "../main-chat-view";
import { type FC } from "react";
import { Message } from "./message";
import { MessageLocal } from "./message-local";
import { Stack } from "@mui/material";
import { styles } from "./styles";

interface Props {
  groupedMessages: GroupedMessage[];
}

export const AllMessages: FC<Props> = ({ groupedMessages }) => {
  return (
    <Stack sx={styles.allMessagesContainer}>
      {groupedMessages.map(({ isLocalSender, messages }, index) => {
        if (isLocalSender) {
          return <MessageLocal key={index} messages={messages} />;
        }

        return <Message key={index} messages={messages} />;
      })}
    </Stack>
  );
};
