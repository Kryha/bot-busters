import { type FC } from "react";
import { Divider, Stack } from "@mui/material";
import { styles } from "./styles";
import { UsernameLocal, UsersOthers } from "./components";

export const Players: FC = () => {
  return (
    <Stack sx={styles.container}>
      <UsernameLocal />
      <Divider sx={styles.divider} />
      <UsersOthers />
    </Stack>
  );
};
