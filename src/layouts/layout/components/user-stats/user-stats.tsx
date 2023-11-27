import { type FC } from "react";
import { Stack } from "@mui/material";
import { signOut } from "next-auth/react";

import { StatsDisplay } from "~/components/stats-display/index.js";
import { text } from "~/assets/text/index.js";

import { UserMenu } from "../user-menu/index.js";
import { MenuDialog } from "../menu-dialog/index.js";
import { styles } from "./styles.js";

interface Props {
  isVerifiedUser: boolean;
  isGamePlayed: boolean;
  username: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  disconnect: () => Promise<void>;
  points: number;
}

export const UserStats: FC<Props> = ({
  isVerifiedUser,
  isGamePlayed,
  username,
  open,
  setOpen,
  disconnect,
  points,
}) => {
  const isVerifiedUserAndPlayed = isVerifiedUser && isGamePlayed;
  const title = isVerifiedUserAndPlayed ? username : text.general.dailyScore;

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
            info={text.general.points(points)}
            isCentered
          />
        )}
        <UserMenu
          isVerifiedUser={isVerifiedUser}
          setOpen={setOpen}
          logout={logout}
        />
      </Stack>
      <MenuDialog open={open} setOpen={setOpen} />
    </Stack>
  );
};
