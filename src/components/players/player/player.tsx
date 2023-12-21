import React, { type FC } from "react";
import { Avatar, Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";
import { Skeleton } from "./skeleton.jsx";
import { type StaticImageData } from "next/image";

interface Props {
  color?: string;
  characterName: string;
  image?: StaticImageData;
}

export const Player: FC<Props> = ({ color = "blue", characterName, image }) => {
  const textColor = `${color}.dark`;
  if (!characterName) return <Skeleton />;

  console.log(image);

  return (
    <Stack sx={styles.container}>
      <Avatar
        sx={styles.avatar}
        color={color}
        src={image?.src}
        alt={characterName}
      />
      <Typography variant="body1" sx={styles.character} color={textColor}>
        {characterName}
      </Typography>
    </Stack>
  );
};
