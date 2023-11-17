import { type FC } from "react";
import { Divider, Stack } from "@mui/material";
import { styles } from "./styles";
import { UsernameLocal, UsersOthers } from "./components";
import { type MatchStateType } from "@/types";

interface Props {
  matchState: MatchStateType;
}

export const Players: FC<Props> = ({ matchState }) => {
  return (
    <Stack sx={styles.container}>
      <UsernameLocal />
      <Divider sx={styles.divider} />
      <UsersOthers matchState={matchState} />
    </Stack>
  );
};
