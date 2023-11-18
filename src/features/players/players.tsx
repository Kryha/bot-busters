import { type FC } from "react";
import { Divider, Stack } from "@mui/material";
import { styles } from "./styles";
import { UsernameLocal, UsersOthers } from "./components";
import { type MatchStateType } from "@/types";
import { type ChatRoom } from "@/server/api/match-types";

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
