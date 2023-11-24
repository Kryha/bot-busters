import { Button, Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";

import { USERS_DATA, VOTING_TIME_MS } from "~/constants/index.js";
import { text } from "~/assets/text/index.js";
import { type MatchStateType } from "~/types/index.js";
import { type ChatRoom } from "~/server/api/match-types.js";
import { Timer } from "~/features/chat/components/index.js";

import { styles } from "./styles.js";
import { COLORS } from "../../constants.js";
import { Player } from "../player/index.js";

interface Props {
  matchState: MatchStateType;
  room: ChatRoom;
}

export const UsersOthers: FC<Props> = ({ matchState, room }) => {
  const isVoting = matchState === "voting";
  const isResults = matchState === "results";
  const intro = isResults ? text.match.whosBot : text.match.otherParticipants;
  const [disable, setDisabled] = useState(false);
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

  return (
    <Stack sx={styles.container}>
      <Typography variant="body1">{intro}</Typography>
      <Stack sx={styles.list(isResults)}>
        {users.map((user, index) => {
          const color = COLORS[index];
          return (
            <Player
              key={index}
              color={color}
              user={user}
              onVote={handleVote}
              matchState={matchState}
            />
          );
        })}
        {isVoting && (
          <Stack sx={styles.timeSection}>
            <Timer time={room.votingAt} duration={VOTING_TIME_MS} />
            <Button
              variant="contained"
              disabled={disable}
              onClick={() => setDisabled(true)}
            >
              {text.general.confirm}
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
