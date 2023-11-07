import { type FC } from "react";
import { Stack } from "@mui/material";

import { UserMenu } from "@/features/landing/components";
import { Stats } from "./stats";
import { styles } from "./styles";

interface Props {
  isWalletConnected: boolean;
  isGamePlayed: boolean;
  username: string;
}

export const UserStats: FC<Props> = ({
  isWalletConnected,
  isGamePlayed,
  username,
}) => {
  const isLoggedInAndPlayed = isWalletConnected && isGamePlayed;

  return (
    <Stack sx={styles.statsWrapper}>
      {!isWalletConnected && <Stats isGamePlayed={isGamePlayed} />}
      <UserMenu isMenuVisible={isLoggedInAndPlayed} username={username} />
    </Stack>
  );
};
