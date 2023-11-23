import { type FC } from "react";
import { Stack, type StackProps } from "@mui/material";

import { styles } from "./styles";

import { useMatchState } from "@/service";

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
