import { type FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { type Player } from "~/server/api/match-types.js";

import { User } from "../user/index.js";
import { styles } from "./styles.js";

interface Props {
  user: Player;
  color?: string;
  hasGuessed: boolean;
}

export const UserResult: FC<Props> = ({ user, color, hasGuessed }) => {
  const textResult = user.isBot ? text.match.isBot : text.match.isHuman;

  // TODO: Add colors to theme
  const textColor = hasGuessed ? "#4CAF50" : "#F44336";

  return (
    <Stack sx={styles.container}>
      <Divider />
      <Stack sx={styles.user}>
        <User username={user.chatNickname} color={color} />
        <Typography variant="body1" color={textColor} sx={styles.text}>
          {textResult}
        </Typography>
      </Stack>
      <Divider />
    </Stack>
  );
};
