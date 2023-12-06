import { type FC } from "react";
import { Divider, Stack, ToggleButton, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { Player } from "~/components/index.js";

import { styles } from "./styles.js";

interface Props {
  characterName: string;
  color?: string;
  isSelected: boolean;
  onSelectPlayer: () => void;
}

export const PlayerVote: FC<Props> = ({
  characterName,
  color,
  isSelected,
  onSelectPlayer,
}) => {
  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.usernameContainer}>
        <Divider />
        <Stack sx={styles.username}>
          <Player characterName={characterName} color={color} />
        </Stack>
        <Divider />
      </Stack>
      <ToggleButton
        value="check"
        selected={isSelected}
        onClick={onSelectPlayer}
      >
        <Typography>{text.general.bot}</Typography>
      </ToggleButton>
    </Stack>
  );
};
