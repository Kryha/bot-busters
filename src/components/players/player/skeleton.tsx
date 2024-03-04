import { Avatar, Skeleton as SkeletonMUI, Stack } from "@mui/material";
import React from "react";

import { styles } from "./styles.js";

export const Skeleton = () => {
  return (
    <Stack sx={styles.container("chat")}>
      <SkeletonMUI variant="rounded">
        <Avatar />
      </SkeletonMUI>
      <SkeletonMUI variant="rectangular" width={167} />
    </Stack>
  );
};
