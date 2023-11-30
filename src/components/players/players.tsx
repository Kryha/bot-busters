import { type FC } from "react";
import { Divider, Stack } from "@mui/material";

import { type MatchRoom, type PlayerType } from "~/server/api/match-types.js";

import { styles } from "./styles.js";
import { PlayerLocal } from "src/components/players/player-local";
import { PlayersOthers } from "src/components/players/players-others";

interface Props {
  room: MatchRoom;
  localPlayer: PlayerType;
  onVote: (selectedUserIds: string[]) => void;
}

export const Players: FC<Props> = ({ room, localPlayer, onVote }) => {
  return (
    <Stack sx={styles.container}>
      <PlayerLocal localPlayer={localPlayer} />
      <Divider sx={styles.divider} />
      <PlayersOthers room={room} localPlayer={localPlayer} onVote={onVote} />
    </Stack>
  );
};
