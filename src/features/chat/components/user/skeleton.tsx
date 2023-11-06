import { Avatar, Stack, Skeleton as SkeletonMUI } from "@mui/material";
import React from "react";
import { styles } from "./styles";

export const Skeleton = () => {
  return (
    <Stack sx={styles.container}>
      <SkeletonMUI variant="rounded">
        <Avatar />
      </SkeletonMUI>
      <SkeletonMUI variant="rectangular" width={167} />
    </Stack>
  );
};
