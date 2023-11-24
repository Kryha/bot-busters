import { type FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { USERS_DATA } from "~/constants/index.js";
import { type UserType } from "~/types/index.js";
import { text } from "~/assets/text/index.js";

import { User } from "../user/index.js";
import { styles } from "./styles.js";

interface Props {
  user: UserType;
  color?: string;
}

export const UserResult: FC<Props> = ({ user, color }) => {
  const { username, isBot } = user;
  const userData = USERS_DATA.find((value) => value.username === username);
  const isResult = isBot === userData?.isBot;
  const textResult = userData?.isBot ? text.match.isBot : text.match.isHuman;

  // TODO: Add colors to theme
  const textColor = isResult ? "#4CAF50" : "#F44336";

  if (!userData) return;

  return (
    <Stack sx={styles.container}>
      <Divider />
      <Stack sx={styles.user}>
        <User username={username} color={color} />
        <Typography variant="body1" color={textColor} sx={styles.text}>
          {textResult}
        </Typography>
      </Stack>
      <Divider />
    </Stack>
  );
};
