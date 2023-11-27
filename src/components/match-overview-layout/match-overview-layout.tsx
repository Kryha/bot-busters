import { type FC } from "react";
import { Stack, type StackProps } from "@mui/material";

import { useMatchState } from "~/service";

import { styles } from "./styles.js";

export const MatchOverviewLayout: FC<StackProps> = (props) => {
  const { children } = props;
  const matchState = useMatchState();

  if (!matchState) return;

  const sx = styles[matchState];

  return (
    <Stack component="section" sx={sx}>
      {children}
    </Stack>
  );
};
