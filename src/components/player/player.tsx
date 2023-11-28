import { type FC } from "react";

import { User, UserResult, UserVote } from "~/components/index.js";
import { type MatchStage, type Player } from "~/server/api/match-types";

export interface Props {
  stage: MatchStage;
  user: Player;
  localPlayer: Player;
  isSelected: boolean;
  color?: string;
  onSelectUser: () => void;
}

export const PlayerData: FC<Props> = ({
  user,
  localPlayer,
  stage,
  isSelected,
  onSelectUser,
}) => {
  const { chatNickname, color } = user;

  const isVoted = localPlayer.votes.includes(user.userId);
  const hasGuessed = user.isBot ? isVoted : !isVoted;

  switch (stage) {
    case "chat":
      return <User username={chatNickname} color={color} />;

    case "voting":
      return (
        <UserVote
          username={chatNickname}
          color={color}
          onSelectUser={onSelectUser}
          isSelected={isSelected}
        />
      );

    case "results":
      return <UserResult user={user} hasGuessed={hasGuessed} />;

    default:
      return <User username={chatNickname} color={color} />;
  }
};
