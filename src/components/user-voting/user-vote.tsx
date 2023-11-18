import { Divider, Stack, ToggleButton, Typography } from "@mui/material";
import { styles } from "./styles";
import { useState, type FC } from "react";
import { User, type UserProps } from "../user";
import { text } from "@/assets/text";

interface Props extends UserProps {
  onVote: (username: string) => void;
}

export const UserVote: FC<Props> = ({ username, color, onVote }) => {
  const [voted, setVoted] = useState(false);

  const handleChange = () => {
    if (username) {
      setVoted(!voted);
      onVote(username);
    }
  };

  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.usernameContainer}>
        <Divider />
        <Stack sx={styles.username}>
          <User username={username} color={color} />
        </Stack>
        <Divider />
      </Stack>
      <ToggleButton value="check" selected={voted} onClick={handleChange}>
        <Typography>{text.general.bot}</Typography>
      </ToggleButton>
    </Stack>
  );
};
