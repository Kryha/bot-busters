import { Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";

import { text } from "~/assets/text/index.js";
import { PlayerData } from "~/components/players/player-data/index.js";
import { PlayerProofs } from "~/components/players/player-proofs/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";
import { Timer } from "~/components/timer/index.js";
import { VOTING_TIME_MS } from "~/constants/index.js";
import {
  type CharacterId,
  type MatchRoom,
  type PlayerType,
} from "~/types/index.js";

import { styles } from "./styles.js";

interface Props {
  room: MatchRoom;
  localPlayer: PlayerType;
  isVoteEnabled: boolean;
  onVote: (selectedUserIds: string[]) => Promise<void>;
}

export const PlayersOthers: FC<Props> = ({
  room,
  localPlayer,
  isVoteEnabled,
  onVote,
}) => {
  const [isLoadingVotes, setIsLoadingVotes] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [proofCharacterId, setProofCharacterId] = useState<CharacterId>();
  const { stage, players, votingAt } = room;

  const resultHeading =
    localPlayer.botsBusted === 0 ? text.match.bummer : text.match.busted;

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

  const handleVote = async () => {
    try {
      setIsLoadingVotes(true);
      await onVote(selectedIds);
    } catch (error) {
      setIsLoadingVotes(false);
    }
  };

  const otherPlayers = players.filter(
    (player) => player.userId !== localPlayer.userId,
  );

  return (
    <Stack sx={styles.container}>
      {stage === "voting" && (
        <Stack sx={styles.voting}>
          <Typography variant="subtitle1" sx={styles.playerHeading}>
            {text.match.bustTheBots}
          </Typography>
          <Typography
            variant="body1"
            sx={styles.playerSubHeading(isVoteEnabled)}
          >
            {isVoteEnabled
              ? text.match.bustTheBotsDescription
              : text.match.bustTheBotsDisabledDescription}
          </Typography>
        </Stack>
      )}

      {stage === "results" && (
        <Stack sx={styles.results}>
          <Typography variant="h2" sx={styles.playerHeading}>
            {resultHeading}
          </Typography>
        </Stack>
      )}

      <Stack sx={styles.list(stage !== "chat")}>
        {otherPlayers.map((player, index) => {
          const isSelected =
            stage !== "results"
              ? selectedIds.includes(player.userId)
              : localPlayer.votes?.includes(player.userId);

          return (
            <PlayerData
              key={index}
              stage={stage}
              player={player}
              localPlayer={localPlayer}
              isSelected={isSelected}
              onSelectPlayer={() => {
                stage === "voting"
                  ? selectPlayer(player.userId)
                  : setProofCharacterId(player.characterId);
              }}
            />
          );
        })}
      </Stack>

      {stage === "voting" && (
        <Stack sx={styles.timeSection}>
          <Timer time={votingAt} duration={VOTING_TIME_MS} />
          <PrimaryButton
            sx={styles.button}
            disabled={!isVoteEnabled || isLoadingVotes || !selectedIds.length}
            onClick={() => void handleVote()}
          >
            {text.general.confirm}
          </PrimaryButton>
        </Stack>
      )}

      {stage === "results" && (
        <PlayerProofs
          otherPlayers={otherPlayers}
          proofCharacterId={proofCharacterId}
        />
      )}
    </Stack>
  );
};
