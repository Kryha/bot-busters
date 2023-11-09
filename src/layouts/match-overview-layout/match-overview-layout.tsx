import { Stack, type StackProps } from "@mui/material";
import { type FC } from "react";
import { styles } from "./styles";
import { useStore } from "@/store";

export const MatchOverviewLayout: FC<StackProps> = (props) => {
  const { children } = props;
  const matchState = useStore((state) => state.matchState);
  const sx = styles[matchState];

  return (
    <Stack component="section" sx={sx}>
      {children}
    </Stack>
  );
};
