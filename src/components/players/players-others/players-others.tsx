import { Button, Stack, Typography } from "@mui/material";
import { type FC, useState } from "react";

import { VOTING_TIME_MS } from "~/constants";
import { text } from "~/assets/text";
import { type MatchRoom, type PlayerType } from "~/server/api/match-types.js";
import { Timer } from "~/components/timer";

import { styles } from "./styles.js";
import { PlayerData } from "~/components/players/player-data";

interface Props {
  room: MatchRoom;
  localPlayer: PlayerType;
  onVote: (selectedUserIds: string[]) => void;
}

export const PlayersOthers: FC<Props> = ({ room, localPlayer, onVote }) => {
  const [disable, setDisabled] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { stage, players, votingAt } = room;

  const selectPlayer = (userId: string) => {
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
    stage === "results" ? text.match.whosBot : text.match.otherParticipants;

  const otherPlayers = players.filter(
    (player) => player.userId !== localPlayer.userId,
  );

  return (
    <Stack sx={styles.container}>
      <Typography variant="body1">{intro}</Typography>

      <Stack sx={styles.list(stage === "results")}>
        {otherPlayers.map((player, index) => {
          return (
            <PlayerData
              key={index}
              player={player}
              isSelected={selectedIds.includes(player.userId)}
              onSelectPlayer={() => selectPlayer(player.userId)}
              stage={stage}
              localPlayer={localPlayer}
            />
          );
        })}

        {stage === "voting" && (
          <Stack sx={styles.timeSection}>
            <Timer time={votingAt} duration={VOTING_TIME_MS} />
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
