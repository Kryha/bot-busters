import { type FC } from "react";
import { Divider, Stack, ToggleButton, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { Player } from "~/components/index.js";

import { styles } from "./styles.js";
import { type Character } from "~/types/index.js";

interface Props {
  character: Character;
  isSelected: boolean;
  onSelectPlayer: () => void;
}

export const PlayerVote: FC<Props> = ({
  character,
  isSelected,
  onSelectPlayer,
}) => {
  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.usernameContainer}>
        <Divider />
        <Stack sx={styles.username}>
          <Player character={character} />
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
