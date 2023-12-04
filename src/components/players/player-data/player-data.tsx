import { type FC } from "react";

import { Player, PlayerResult, PlayerVote } from "~/components";
import { type MatchStage, type PlayerType } from "~/server/api/match-types";
import { CHARACTERS } from "~/constants";

export interface Props {
  stage: MatchStage;
  player: PlayerType;
  localPlayer: PlayerType;
  isSelected: boolean;
  color?: string;
  onSelectPlayer: () => void;
}

export const PlayerData: FC<Props> = ({
  player,
  localPlayer,
  stage,
  isSelected,
  onSelectPlayer,
}) => {
  const character = CHARACTERS[player.characterId]!;
  const { name, color } = character;

  const isVoted = localPlayer.votes.includes(player.userId);
  const hasGuessed = player.isBot ? isVoted : !isVoted;

  switch (stage) {
    case "voting":
      return (
        <PlayerVote
          characterName={name}
          color={color}
          onSelectPlayer={onSelectPlayer}
          isSelected={isSelected}
        />
      );

    case "results":
      return <PlayerResult player={player} hasGuessed={hasGuessed} />;

    default:
      return <Player characterName={name} color={color} />;
  }
};
