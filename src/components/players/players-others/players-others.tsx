import { Stack, Typography } from "@mui/material";
import { type FC, useState } from "react";

import { VOTING_TIME_MS } from "~/constants/index.js";
import { text } from "~/assets/text/index.js";
import { type MatchRoom, type PlayerType } from "~/types/index.js";
import { Timer } from "~/components/timer/index.js";
import { PlayerOthersResults } from "../player-others-results/index.js";
import { PlayerData } from "~/components/players/player-data/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";

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
  const [viewResults, setViewResults] = useState<string>("1");
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
          <Typography variant="body1" sx={styles.playerSubHeading}>
            {text.match.bustTheBotsDescription}
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
          return (
            <PlayerData
              key={index}
              player={player}
              isSelected={selectedIds.includes(player.userId)}
              onSelectPlayerVote={() => selectPlayer(player.userId)}
              onSelectPlayerResult={() => setViewResults(player.characterId)}
              stage={stage}
              localPlayer={localPlayer}
            />
          );
        })}
      </Stack>
      {stage === "voting" && (
        <Stack sx={styles.timeSection}>
          <Timer time={votingAt} duration={VOTING_TIME_MS} />
          <PrimaryButton
            sx={styles.button}
            disabled={!isVoteEnabled || isLoadingVotes}
            onClick={() => void handleVote()}
          >
            {text.general.confirm}
          </PrimaryButton>
        </Stack>
      )}
      {stage === "results" && (
        <PlayerOthersResults
          otherPlayers={otherPlayers}
          viewResults={viewResults}
        />
      )}
    </Stack>
  );
};
