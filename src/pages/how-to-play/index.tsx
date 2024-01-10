import { Stack, Typography } from "@mui/material";
import React, { type FC } from "react";
import { text } from "~/assets/text";
import { styles } from "./styles.js";

const HowToPlay: FC = () => {
  return (
    <Stack sx={styles.container} >
      <Typography variant="h1" textAlign="center">
        {text.general.howToPlay}
      </Typography>
      <Typography variant="body1" textAlign="center">
        BotBusters is a multiplayer chatroom game where you interact with a mix of humans and bots and do your best to discern who the bots are.
        <br />
        Each round of BotBusters plays out in four phases
      </Typography>
    </Stack>
)};

export default HowToPlay;

