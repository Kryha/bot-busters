import React, { type FC } from "react";
import { styles } from "./styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";

interface ChatMsgProps {
  avatar?: string;
  messages?: string[];
  side?: "left" | "right";
}

export const ChatMsg: FC<ChatMsgProps> = ({
  avatar,
  messages = [],
  side = "left",
}) => {
  const gridContent = side === "right" ? "flex-end" : "flex-start";

  return (
    <Grid container spacing={2} justifyContent={gridContent}>
      {side === "left" && (
        <Grid item>
          <Avatar src={avatar} sx={styles.avatar} />
        </Grid>
      )}
      <Grid item xs={8} marginBottom={2}>
        {messages.map((msg, i) => {
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
