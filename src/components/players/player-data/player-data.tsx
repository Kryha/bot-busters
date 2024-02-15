import { type FC } from "react";

import { Player, PlayerResult, PlayerVote } from "~/components/index.js";
import { CHARACTERS } from "~/constants/index.js";
import { type MatchStage, type PlayerType } from "~/types/index.js";

export interface Props {
  stage: MatchStage;
  player: PlayerType;
  localPlayer: PlayerType;
  isProofSelected: boolean;
  isSelected?: boolean;
  color?: string;
  onSelectPlayer: () => void;
  onHoverPlayer?: (hovering: boolean) => void;
}

export const PlayerData: FC<Props> = ({
  player,
  localPlayer,
  stage,
  isProofSelected,
  isSelected,
  onSelectPlayer,
  onHoverPlayer,
}) => {
  const character = CHARACTERS[player.characterId]!;
  const isVoted = !!localPlayer.votes?.includes(player.userId);
  const hasGuessed = player.isBot ? isVoted : !isVoted;

  switch (stage) {
    case "voting":
      return (
        <PlayerVote
          character={character}
          onSelectPlayer={onSelectPlayer}
          isSelected={isSelected}
        />
      );

    case "results":
      return (
        <PlayerResult
          player={player}
          hasGuessed={hasGuessed}
          isSelected={isSelected}
          isProofSelected={isProofSelected}
          onSelectPlayer={onSelectPlayer}
          onHoverPlayer={onHoverPlayer}
        />
      );

    default:
      return <Player character={character} />;
  }
};
