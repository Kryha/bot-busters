import { type FC } from "react";
import { Stack } from "@mui/material";
import { signOut } from "next-auth/react";

import { UserMenu } from "@/layouts/layout/components/user-menu";
import { MenuDialog } from "@/layouts/layout/components/menu-dialog";
import { StatsDisplay } from "@/components/stats-display";
import { text } from "@/assets/text";
import { styles } from "./styles";

interface Props {
  isWalletConnected: boolean;
  isGamePlayed: boolean;
  username: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  disconnect: () => Promise<void>;
  points: number;
}

export const UserStats: FC<Props> = ({
  isWalletConnected,
  isGamePlayed,
  username,
  open,
  setOpen,
  disconnect,
  points,
}) => {
  const isWalletConnectedAndPlayed = isWalletConnected && isGamePlayed;
  const title = isWalletConnectedAndPlayed ? username : text.landing.dailyScore;

  const logout = async () => {
    await signOut();
    await disconnect();
    sessionStorage.clear();
  };

  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.statsWrapper}>
        {isGamePlayed && (
          <StatsDisplay
            title={title}
            info={text.landing.points(points)}
            isCentered
          />
        )}
        <UserMenu
          isWalletConnected={isWalletConnected}
          setOpen={setOpen}
          logout={logout}
        />
      </Stack>
      <MenuDialog
        open={open}
        setOpen={setOpen}
        isWalletConnected={isWalletConnected}
      />
    </Stack>
  );
};
