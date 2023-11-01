import { Avatar, Stack, Typography } from "@mui/material";
import { styles } from "./styles";
import { type FC } from "react";
import { text } from "../../text";
import { Skeleton } from "./skeleton";

interface Props {
  color?: string;
  isLoading?: boolean;
}

export const Username: FC<Props> = ({ color = "blue", isLoading }) => {
  const textColor = `${color}.dark`;
  const src = "../images/svg/alien.svg";

  if (isLoading) return <Skeleton />;

  return (
    <Stack sx={styles.container}>
      <Avatar src={src} color={color} sx={styles.avatar} />
      <Typography variant="body1" color={textColor}>
        {text.username}
      </Typography>
    </Stack>
  );
};
