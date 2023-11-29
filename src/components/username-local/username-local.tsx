import { type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { User } from "~/components/index.js";
import { text } from "~/assets/text/index.js";
import { type Player } from "~/server/api/match-types.js";

import { styles } from "./styles.js";
import { CHARACTERS } from "~/constants";

interface Props {
  localPlayer: Player;
}

export const UsernameLocal: FC<Props> = ({ localPlayer }) => {
  const character = CHARACTERS[localPlayer.characterId];
  return (
    <Stack sx={styles.container}>
      <Typography variant="body1">{text.match.inThisChat}</Typography>
      <User username={character!.name} color={character!.color} />
    </Stack>
  );
};
