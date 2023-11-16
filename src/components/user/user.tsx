import { Avatar, Stack, type StackProps, Typography } from "@mui/material";
import { styles } from "./styles";
import { type FC } from "react";
import { Skeleton } from "./skeleton";
import { type UserType } from "@/types";

export interface UserProps extends StackProps, Pick<UserType, "username"> {
  color?: string;
}

export const User: FC<UserProps> = ({ color = "blue", username }) => {
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
