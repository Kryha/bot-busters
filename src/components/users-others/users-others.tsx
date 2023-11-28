import { Button, Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";

import { VOTING_TIME_MS } from "~/constants/index.js";
import { text } from "~/assets/text/index.js";
import { type Player, type MatchRoom } from "~/server/api/match-types.js";
import { Timer } from "~/components/timer/index.js";
import { COLORS } from "~/constants/index.js";

import { styles } from "./styles.js";
import { PlayerData } from "../player/index.js";

interface Props {
  room: MatchRoom;
  localPlayer: Player;
  onVote: (selectedUserIds: string[]) => void;
}

export const UsersOthers: FC<Props> = ({ room, localPlayer, onVote }) => {
  const [disable, setDisabled] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectUser = (userId: string) => {
    setSelectedIds((prevIds) => {
      const idsSet = new Set(prevIds);

      if (idsSet.has(userId)) {
        idsSet.delete(userId);
      } else {
        idsSet.add(userId);
      }

      return Array.from(idsSet);
    });
  };

  const handleVote = () => {
    setDisabled(true);
    onVote(selectedIds);
  };

  const intro =
    room.stage === "results"
      ? text.match.whosBot
      : text.match.otherParticipants;

  const otherPlayers = room.players.filter(
    (player) => player.userId !== localPlayer.userId
  );

  return (
    <Stack sx={styles.container}>
      <Typography variant="body1">{intro}</Typography>

      <Stack sx={styles.list(room.stage === "results")}>
        {otherPlayers.map((user, index) => {
          const color = COLORS[index];
          return (
            <PlayerData
              key={index}
              color={color}
              user={user}
              isSelected={selectedIds.includes(user.userId)}
              onSelectUser={() => selectUser(user.userId)}
              room={room}
              localPlayer={localPlayer}
            />
          );
        })}

        {room.stage === "voting" && (
          <Stack sx={styles.timeSection}>
            <Timer time={room.votingAt} duration={VOTING_TIME_MS} />
            <Button
              variant="contained"
              disabled={disable}
              onClick={() => handleVote()}
            >
              {text.general.confirm}
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
