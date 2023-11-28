import { type FC } from "react";
import { Divider, Stack } from "@mui/material";

import { type Player, type MatchRoom } from "~/server/api/match-types.js";

import { styles } from "./styles.js";
import { UsernameLocal } from "~/components/username-local";
import { UsersOthers } from "~/components/users-others";

interface Props {
  room: MatchRoom;
  localPlayer: Player;
  onVote: (selectedUserIds: string[]) => void;
}

export const Players: FC<Props> = ({ room, localPlayer, onVote }) => {
  return (
    <Stack sx={styles.container}>
      <UsernameLocal localPlayer={localPlayer} />
      <Divider sx={styles.divider} />
      <UsersOthers room={room} localPlayer={localPlayer} onVote={onVote} />
    </Stack>
  );
};
