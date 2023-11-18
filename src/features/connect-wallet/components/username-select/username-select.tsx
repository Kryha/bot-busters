import { type FC } from "react";
import { Stack } from "@mui/material";

import { AddUsernameTable, CreateUsernameRow } from "@/components/tables";
import { styles } from "./styles";
interface UsernameSelectProps {
  handleSetUsername: (username: string) => void;
  error: string;
}

export const UsernameSelect: FC<UsernameSelectProps> = ({
  handleSetUsername,
  error,
}) => {
  // TODO: finish component

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <AddUsernameTable />
        <CreateUsernameRow
          handleSetUsername={handleSetUsername}
          error={error}
        />
      </Stack>
    </Stack>
  );
};
