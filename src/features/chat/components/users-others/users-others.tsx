import { Stack, Typography } from "@mui/material";
import { styles } from "./styles";
import { USERS_DATA } from "@/constants";
import { text } from "../../text";
import { useState, type FC, useEffect } from "react";
import { VoteUser } from "../vote-user";
import { type GameStateType } from "../participants-overview";
import { User } from "../user";
import { COLORS } from "../../constants";
import { UserResult } from "../user-results";
import { useRouter } from "next/router";
import { z } from "zod";
import { pages } from "@/utils/router";

interface Props {
  gameState?: GameStateType;
  onDecided: () => void;
}

export const UsersOthers: FC<Props> = ({ onDecided }) => {
  const { query, push } = useRouter();

  // TODO: Fix router & Global state
  const parse = z.string().safeParse(query.gameState);
  const roomId = z.string().safeParse(query.roomId);
  const gameState = parse.success ? parse.data : "Initial";
  const isDecision = gameState === "Decision";
  const isResults = gameState === "Results";
  const [users, setUsers] = useState(
    USERS_DATA.map((user) => ({ ...user, voted: false }))
  );

  useEffect(() => {
    const allVoted = users.every((user) => user.voted);

    if (allVoted && roomId.success) {
      onDecided();
      void push(
        {
          pathname: pages.chat,
          query: { roomId: roomId.data, gameState: "Results" },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, [users, onDecided, roomId.success]);

  const intro = isResults ? text.whosBotAnd : text.otherParticipants;

  return (
    <Stack sx={styles.container}>
      <Typography variant="body1">{intro}</Typography>
      <Stack sx={styles.list(isResults)}>
        {users.map(({ username, voted }, index) => {
          const color = COLORS[index];

          const handleVote = (index: number) =>
            setUsers(
              users.map((user, i) =>
                i === index ? { ...user, voted: true } : user
              )
            );
          if (voted || isResults)
            return <UserResult key={index} id={String(index)} />;

          if (isDecision)
            return (
              <VoteUser
                key={index}
                id={String(index)}
                color={color}
                onVote={() => handleVote(index)}
              />
            );

          return <User key={index} color={color} username={username} />;
        })}
      </Stack>
    </Stack>
  );
};
