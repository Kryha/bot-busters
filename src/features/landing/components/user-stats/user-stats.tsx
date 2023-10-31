import { type FC } from "react";
import { Stack } from "@mui/material";

import { UserMenu } from "@/features/landing/components";
import { Stats } from "./stats";
import { styles } from "./styles";

interface Props {
  isAuthenticated: boolean;
  isGamePlayed: boolean;
  username: string;
}

export const UserStats: FC<Props> = ({
  isAuthenticated,
  isGamePlayed,
  username,
}) => {
  const isLoggedInAndPlayed = isAuthenticated && isGamePlayed;

  return (
    <Stack sx={styles.statsWrapper}>
      {!isAuthenticated && <Stats isGamePlayed={isGamePlayed} />}
      <UserMenu isMenuVisible={isLoggedInAndPlayed} username={username} />
    </Stack>
  );
};
