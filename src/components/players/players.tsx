import { type FC } from "react";
import { Divider, Stack } from "@mui/material";

import { type MatchStateType } from "~/types";
import { type ChatRoom } from "~/server/api/match-types.js";

import { styles } from "./styles.js";
import { UsernameLocal } from "~/components/username-local";
import { UsersOthers } from "~/components/users-others";

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
