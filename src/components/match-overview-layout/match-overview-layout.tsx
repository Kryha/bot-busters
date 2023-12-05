import { type ReactNode, type FC } from "react";
import { Stack } from "@mui/material";

import { type MatchStage } from "~/types/index.js";

import { styles } from "./styles.js";

interface Props {
  children: ReactNode;
  matchStage: MatchStage;
}

export const MatchOverviewLayout: FC<Props> = ({ children, matchStage }) => {
  const sx = styles[matchStage];

  return (
    <Stack component="section" sx={sx}>
      {children}
    </Stack>
  );
};
