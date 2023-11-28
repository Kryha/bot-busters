import { Typography } from "@mui/material";

import { text } from "~/assets/text";
import { SplashScreen } from "~/components";
import { useMatchState } from "~/service";

export const SplashScreenVoting = () => {
  const matchState = useMatchState();
  const isVoting = matchState === "voting";

  return (
    <SplashScreen show={isVoting}>
      <Typography variant="h1">{text.match.voting}</Typography>
    </SplashScreen>
  );
};
