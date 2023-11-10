import { useState, type FC } from "react";
import { Stack } from "@mui/material";

import { UserMenu } from "@/components/user-menu";
import { MenuDialog } from "@/components/menu-dialog";
import { InfoDisplay } from "@/components/info-display";
import { text } from "@/assets/text";
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
  const [open, setOpen] = useState(false);
  const isLoggedInAndPlayed = isAuthenticated && isGamePlayed;
  const title = isLoggedInAndPlayed ? username : text.landing.dailyScore;

  return (
    <>
      <Stack sx={styles.statsWrapper}>
        {isGamePlayed && (
          <InfoDisplay title={title} info={text.landing.points(5)} isCentered />
        )}
        <UserMenu setOpen={setOpen} />
      </Stack>
      <MenuDialog
        open={open}
        setOpen={setOpen}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
};
