import { type FC } from "react";
import { Stack } from "@mui/material";

import { AddUsernameTable } from "@/components/tables";
import { styles } from "./styles";
import { RowCreateUsername } from "@/components/tables/components";
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
        <RowCreateUsername
          handleSetUsername={handleSetUsername}
          error={error}
        />
      </Stack>
    </Stack>
  );
};
