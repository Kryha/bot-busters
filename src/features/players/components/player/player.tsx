import { type FC } from "react";

import { User, UserResult, UserVote } from "~/components/index.js";
import { type Player, type MatchRoom } from "~/server/api/match-types";

export interface Props {
  room: MatchRoom;
  user: Player;
  localPlayer: Player;
  isSelected: boolean;
  color?: string;
  onSelectUser: () => void;
}

export const PlayerData: FC<Props> = ({
  user,
  localPlayer,
  color,
  room,
  isSelected,
  onSelectUser,
}) => {
  const { chatNickname } = user;

  const isVoted = localPlayer.votes.includes(user.userId);
  const hasGuessed = user.isBot ? isVoted : !isVoted;

  switch (room.stage) {
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
      return <UserResult user={user} color={color} hasGuessed={hasGuessed} />;

    default:
      return <User username={chatNickname} color={color} />;
  }
};
