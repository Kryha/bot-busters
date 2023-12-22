import { type FC } from "react";
import { Stack } from "@mui/material";

import { type MatchRoom, type PlayerType } from "~/types/index.js";
import { PlayerLocal } from "~/components/players/player-local/index.js";
import { PlayersOthers } from "~/components/players/players-others/index.js";

import { styles } from "./styles.js";

interface Props {
  room: MatchRoom;
  localPlayer: PlayerType;
  isVoteEnabled: boolean;
  onVote: (selectedUserIds: string[]) => Promise<void>;
}

export const Players: FC<Props> = ({
  room,
  localPlayer,
  isVoteEnabled,
  onVote,
}) => {
  return (
    <Stack sx={styles.container}>
      <PlayerLocal localPlayer={localPlayer} />
      <PlayersOthers
        room={room}
        localPlayer={localPlayer}
        isVoteEnabled={isVoteEnabled}
        onVote={onVote}
      />
    </Stack>
  );
};
