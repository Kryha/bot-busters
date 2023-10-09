import { type FC } from "react";
import { SendRounded } from "@mui/icons-material";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";

import { styles } from "./styles";
import { ChatMsg } from "../chat-message";
import { chats } from "./chats";
import { text } from "@/assets/text";

interface Props {
  open: boolean;
  isSmallScreen: boolean;
}
export const MainChatView: FC<Props> = ({ open, isSmallScreen }) => {
  if (!isSmallScreen && !open)
    return (
      <Typography variant="h2" sx={styles.text}>
        {text.general.clickChat}
      </Typography>
    );

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        {chats.map((msgs, index) => (
          <ChatMsg
            key={index}
            avatar={""}
            messages={msgs.msg}
            side={msgs.side}
          />
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
