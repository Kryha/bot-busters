import React, { type FC } from "react";
import { styles } from "./styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { type ChatMessage } from "@/types";

interface ChatMsgProps {
  message: ChatMessage;
}

export const ChatMsg: FC<ChatMsgProps> = ({ message }) => {
  const side = message.isLocalUser ? "right" : "left";
  const gridContent = message.isLocalUser ? "flex-end" : "flex-start";

  return (
    <Grid container spacing={2} justifyContent={gridContent}>
      {side === "left" && (
        <Grid item>
          <Avatar src={message.avatar} sx={styles.avatar} />
        </Grid>
      )}
      <Grid item xs={8} marginBottom={2}>
        {message.content.map((msg, i) => {
          const textStyle = {
            ...styles.msg,
            ...styles[side],
          };
          return (
            <Box key={`${msg}.${i}`} component="div" sx={styles[`${side}Row`]}>
              <Typography align="left" sx={textStyle} variant="body1">
                {msg}
              </Typography>
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
};
