import { Button, Stack, Typography } from "@mui/material";
import { styles } from "./styles";
import { USERS_DATA } from "@/constants";
import { useState, type FC } from "react";
import { COLORS } from "../../constants";
import { useStore } from "@/store";
import { Player } from "../player";
import { text } from "@/assets/text";

export const UsersOthers: FC = () => {
  const [matchState, setMatchState] = useStore((state) => [
    state.matchState,
    state.setMatchState,
  ]);
  const isVoting = matchState === "voting";
  const isResults = matchState === "results";
  const intro = isResults ? text.match.whosBot : text.match.otherParticipants;

  const [users, setUsers] = useState(
    USERS_DATA.map((user) => ({ ...user, isBot: false }))
  );

  const handleVote = (username: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        const isUser = user.username === username;

        if (isUser) return { ...user, isBot: !user.isBot };
        return user;
      })
    );
  };

  const handleConfirm = () => setMatchState("results");

  return (
    <Stack sx={styles.container}>
      <Typography variant="body1">{intro}</Typography>
      <Stack sx={styles.list(isResults)}>
        {users.map((user, index) => {
          const color = COLORS[index];
          return (
            <Player key={index} color={color} user={user} onVote={handleVote} />
          );
        })}
        {isVoting && (
          <Button variant="contained" onClick={handleConfirm}>
            {text.general.confirm}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
