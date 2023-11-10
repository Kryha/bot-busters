import { type FC } from "react";
import { Stack } from "@mui/material";

import { Stats } from "./stats";
import { styles } from "./styles";
import { UserMenu } from "../user-menu";

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
