import { type FC } from "react";
import { Stack } from "@mui/material";

import { AddUsernameTable, CreateUsernameRow } from "@/components/tables";
import { styles } from "./styles";

export const UsernameSelect: FC = () => {
  // TODO: finish component
  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <AddUsernameTable />
        <CreateUsernameRow />
      </Stack>
    </Stack>
  );
};
