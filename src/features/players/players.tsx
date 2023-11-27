import { type FC } from "react";
import { Divider, Stack } from "@mui/material";

import { type MatchStateType } from "~/types/index.js";
import { type ChatRoom } from "~/server/api/match-types.js";

import { styles } from "./styles.js";
import { UsernameLocal, UsersOthers } from "./components/index.js";

interface Props {
  matchState: MatchStateType;
  room: ChatRoom;
}

export const Players: FC<Props> = ({ matchState, room }) => {
  return (
    <Stack sx={styles.container}>
      <UsernameLocal />
      <Divider sx={styles.divider} />
      <UsersOthers matchState={matchState} room={room} />
    </Stack>
  );
};
