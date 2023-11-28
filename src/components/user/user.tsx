import { type FC } from "react";
import { Avatar, Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";
import { Skeleton } from "./skeleton";

interface Props {
  color?: string;
  username: string;
}

export const User: FC<Props> = ({ color = "blue", username }) => {
  // TODO: Fix "src" after svg's set up
  const src = "../images/svg/alien.svg";
  const textColor = `${color}.dark`;

  if (!username) return <Skeleton />;

  return (
    <Stack sx={styles.container}>
      <Avatar src={src} color={color} sx={styles.avatar} />
      <Typography variant="body1" color={textColor}>
        {username}
      </Typography>
    </Stack>
  );
};
