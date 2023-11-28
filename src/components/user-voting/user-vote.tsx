import { type FC } from "react";
import { Divider, Stack, ToggleButton, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";

import { User } from "../user/index.js";
import { styles } from "./styles.js";

interface Props {
  username: string;
  color?: string;
  isSelected: boolean;
  onSelectUser: () => void;
}

export const UserVote: FC<Props> = ({
  username,
  color,
  isSelected,
  onSelectUser,
}) => {
  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.usernameContainer}>
        <Divider />
        <Stack sx={styles.username}>
          <User username={username} color={color} />
        </Stack>
        <Divider />
      </Stack>
      <ToggleButton value="check" selected={isSelected} onClick={onSelectUser}>
        <Typography>{text.general.bot}</Typography>
      </ToggleButton>
    </Stack>
  );
};
