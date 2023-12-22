import React, { type FC } from "react";
import { Avatar, Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";
import { Skeleton } from "./skeleton.jsx";
import { type Character } from "~/types/index.js";

interface Props {
  character: Character;
}

export const Player: FC<Props> = ({ character }) => {
  const { name, color, image } = character;
  const textColor = `${color}.dark`;
  if (!name) return <Skeleton />;

  return (
    <Stack sx={styles.container}>
      <Avatar sx={styles.avatar} src={image} alt={name} />
      <Typography variant="body1" sx={styles.character} color={textColor}>
        {name}
      </Typography>
    </Stack>
  );
};
