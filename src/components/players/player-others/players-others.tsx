import { Box, Popper, Stack, Typography } from "@mui/material";
import { type FC, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { usePlaySFX } from "~/hooks/sounds.js";
import { text } from "~/assets/text/index.js";
import { PlayerData } from "~/components/players/player-data/index.js";
import { PlayerProofs } from "~/components/players/player-proofs/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";
import { Timer } from "~/components/timer/index.js";
import { errorMessage } from "~/constants/error-messages.js";
import { VOTING_TIME_MS } from "~/constants/index.js";
import {
  type CharacterId,
  type MatchRoom,
  type PlayerType,
} from "~/types/index.js";

import { useDelayedVisibility } from "~/utils/delay.js";
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
  const { showBoundary } = useErrorBoundary();
  const [isLoadingVotes, setIsLoadingVotes] = useState(false);
  const [popperHover, setPopperHover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const playSfx = usePlaySFX();
  const [proofCharacterId, setProofCharacterId] = useState<
    CharacterId | undefined
  >();

  const { stage, players, votingAt } = room;

  const { isVisible, show } = useDelayedVisibility(500);

  const [resultHeading, resultSubheading] = (() => {
    if (room.stage !== "results") return ["", ""];

    if (localPlayer.botsBusted === 0 && localPlayer.humansBusted === 0) {
      return [text.match.bummer, ""];
    }

    const [totalBots, totalHumans] = room.players
      .filter((p) => p.userId !== localPlayer.userId)
      .reduce(
        ([bots, humans], p) =>
          p.isBot ? [bots + 1, humans] : [bots, humans + 1],
        [0, 0],
      );

    if (
      localPlayer.botsBusted === totalBots &&
      localPlayer.humansBusted === totalHumans
    ) {
      return [text.match.busted, ""];
    }

    return [text.match.goodJobKinda, ""];
  })();

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

  const handleOnHover = (anchor: HTMLDivElement, playerId?: CharacterId) => {
    setProofCharacterId(playerId);
    setAnchorEl(anchor);
    show();
  };

  const handleVote = async () => {
    try {
      setIsLoadingVotes(true);
      playSfx("BlipUp");
      await onVote(selectedIds);
    } catch (e) {
      e instanceof Error
        ? console.error(`[${errorMessage.match.voting}]: ${e.message}`, e)
        : console.error(e);

      setIsLoadingVotes(false);
      showBoundary(errorMessage.support);
    }
  };

  const otherPlayers = players.filter(
    (player) => player.userId !== localPlayer.userId,
  );

  return (
    <Stack sx={styles.container(stage)}>
      {stage === "voting" && (
        <Stack sx={styles.voting}>
          <Typography variant="h2" sx={styles.playerHeading}>
            {text.match.bustTheBots}
          </Typography>
          {isLoadingVotes ? (
            <Typography
              variant="body1"
              sx={styles.playerSubHeading(isVoteEnabled)}
            >
              {text.match.calculatingVotes}
              <Box component="span" sx={styles.loading} />
            </Typography>
          ) : (
            <Typography
              variant="body1"
              sx={styles.playerSubHeading(isVoteEnabled)}
            >
              {isVoteEnabled
                ? text.match.bustTheBotsDescription
                : text.match.bustTheBotsDisabledDescription}
            </Typography>
          )}
        </Stack>
      )}

      {stage === "results" && (
        <Stack sx={styles.results}>
          <Typography variant="h2" sx={styles.playerHeading}>
            {resultHeading}
          </Typography>
          <Typography variant="body1" textAlign="center">
            {resultSubheading}
          </Typography>
        </Stack>
      )}

      <Stack sx={styles.list(stage)}>
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
              isProofSelected={player.characterId === proofCharacterId}
              isLoadingVotes={isLoadingVotes}
              isVoteEnabled={isVoteEnabled}
              onSelectPlayer={() => {
                stage === "voting"
                  ? selectPlayer(player.userId)
                  : setProofCharacterId(player.characterId);
              }}
              onHoverPlayer={handleOnHover}
            />
          );
        })}
      </Stack>

      {stage === "voting" && (
        <Stack sx={styles.timeSection}>
          <Timer
            time={votingAt}
            duration={VOTING_TIME_MS}
            stage={room.stage}
            definedStage={"voting"}
          />
          {!isLoadingVotes && isVoteEnabled && (
            <PrimaryButton
              sx={styles.button}
              disabled={!selectedIds.length}
              onClick={() => void handleVote()}
            >
              {text.general.confirm}
            </PrimaryButton>
          )}
        </Stack>
      )}

      {stage === "results" && (
        <>
          <Popper
            id={"id"}
            open={isVisible || popperHover}
            anchorEl={anchorEl}
            placement="bottom-end"
            modifiers={[
              {
                name: "flip",
                enabled: false,
                options: {
                  altBoundary: true,
                  rootBoundary: "document",
                  padding: 8,
                },
              },
            ]}
          >
            <PlayerProofs
              otherPlayers={otherPlayers}
              proofCharacterId={proofCharacterId}
              onHoverPlayer={(hovered: boolean) => setPopperHover(hovered)}
            />
          </Popper>
        </>
      )}
    </Stack>
  );
};
