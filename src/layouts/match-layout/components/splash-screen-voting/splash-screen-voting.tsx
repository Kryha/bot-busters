import { Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { SplashScreen } from "~/components/index.js";
import { useMatchState } from "~/service/index.js";

export const SplashScreenVoting = () => {
  const matchState = useMatchState();
  const isVoting = matchState === "voting";

  return (
    <SplashScreen show={isVoting}>
      <Typography variant="h1">{text.match.voting}</Typography>
    </SplashScreen>
  );
};
