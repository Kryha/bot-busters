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

  const attachClass = (index: number) => {
    if (index === 0) {
      return styles[`${side}First`];
    }
    if (index === messages.length - 1) {
      return styles[`${side}Last`];
    }
    return "";
  };

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
            ...attachClass(i),
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
