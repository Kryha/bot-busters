import { type FC } from "react";
import { useStore } from "@/store";
import { User, UserResult, UserVote } from "@/components";
import { type UserType } from "@/types";

export interface PlayerProps {
  user: UserType;
  color?: string;
  onVote: (username: string) => void;
}

export const Player: FC<PlayerProps> = ({ user, color, onVote }) => {
  const matchState = useStore((state) => state.matchState);
  const { username } = user;

  switch (matchState) {
    case "chat":
      return <User username={username} color={color} />;

    case "voting":
      return <UserVote username={username} color={color} onVote={onVote} />;

    case "results":
      return <UserResult user={user} color={color} />;

    default:
      return <User username={username} color={color} />;
  }
};
