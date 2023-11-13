import { Stack, Typography } from "@mui/material";
import { styles } from "./styles";
import { USERS_DATA } from "@/constants";
import { text } from "../../text";
import { useState, type FC, useEffect } from "react";
import { VoteUser } from "../vote-user";
import { User } from "../user";
import { UserResult } from "../user-results";
import { COLORS } from "../../constants";
import { useStore } from "@/store";

export const UsersOthers: FC = () => {
  const [matchState, setMatchState] = useStore((state) => [
    state.matchState,
    state.setMatchState,
  ]);
  const isVoting = matchState === "voting";
  const isResults = matchState === "results";

  const [users, setUsers] = useState(
    USERS_DATA.map((user) => ({ ...user, voted: false }))
  );

  useEffect(() => {
    const allVoted = users.every((user) => user.voted);

    if (allVoted) {
      setMatchState("results");
    }
  }, [users, setMatchState]);

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

          if (isVoting)
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
