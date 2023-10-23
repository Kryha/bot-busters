import { type FC } from "react";
import { SendRounded } from "@mui/icons-material";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";

import { ChatMsg } from "@/features/chat/components";
import { text } from "@/assets/text";
import { type ChatMessageData } from "@/types";
import { styles } from "./styles";

interface Props {
  open: boolean;
  isSmallScreen: boolean;
  messages: ChatMessageData[];
}

export const MainChatView: FC<Props> = ({ open, isSmallScreen, messages }) => {
  if (!isSmallScreen && !open)
    return (
      <Typography variant="h2" sx={styles.text}>
        {text.general.clickChat}
      </Typography>
    );

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        {messages.map((msg, index) => (
          <ChatMsg key={index} message={msg} />
        ))}
      </Stack>
      <TextField
        sx={styles.input}
        id="chat"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SendRounded />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};
