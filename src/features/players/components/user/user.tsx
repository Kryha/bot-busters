import { Avatar, Stack, type StackProps, Typography } from "@mui/material";
import { styles } from "./styles";
import { type FC } from "react";
import { Skeleton } from "./skeleton";
import { text } from "@/assets/text";

interface Props extends StackProps {
  username?: string;
  color?: string;
  isLoading?: boolean;
}

export const User: FC<Props> = ({ color = "blue", isLoading, username }) => {
  // TODO: Fix "src" after svg's set up
  const src = "../images/svg/alien.svg";
  const textColor = `${color}.dark`;

  if (isLoading) return <Skeleton />;

  return (
    <Stack sx={styles.container}>
      <Avatar src={src} color={color} sx={styles.avatar} />
      <Typography variant="body1" color={textColor}>
        {username ?? text.general.username}
      </Typography>
    </Stack>
  );
};
