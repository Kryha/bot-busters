import { type FC } from "react";
import { SendRounded } from "@mui/icons-material";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";

import { styles } from "./styles";
import { ChatMsg } from "../chat-message";
// import { chats } from "./chats";
import { text } from "@/assets/text";

export interface GroupedMessage {
  side: "right" | "left";
  messages: string[];
}

interface Props {
  open: boolean;
  isSmallScreen: boolean;
  messages: GroupedMessage[];
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
}

export const MainChatView: FC<Props> = ({
  open,
  isSmallScreen,
  messages,
  message,
  setMessage,
  sendMessage,
}) => {
  if (!isSmallScreen && !open)
    return (
      <Typography variant="h2" sx={styles.text}>
        {text.general.clickChat}
      </Typography>
    );

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        {messages.map((msgs, index) => (
          <ChatMsg
            key={index}
            avatar={""}
            messages={msgs.messages}
            side={msgs.side}
          />
        ))}
      </Stack>
      <TextField
        sx={styles.input}
        id="chat"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment onClick={() => sendMessage()} position="end">
              <SendRounded />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};
