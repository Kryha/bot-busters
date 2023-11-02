import { type FC } from "react";
import { Divider, Stack } from "@mui/material";

import { styles } from "./styles";
import { UsernameLocal } from "@/features/chat/components";
import { UsernameOthers } from "../username-others";

export const ParticipantsOverview: FC = () => {
  const isFinished = false;
  return (
    <Stack component="section" sx={styles.wrapper(isFinished)}>
      <Stack sx={styles.container}>
        <UsernameLocal />
        <Divider sx={styles.divider} />
        <UsernameOthers isFinished={isFinished} />
      </Stack>
    </Stack>
  );
};
