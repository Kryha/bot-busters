import { Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { SplashScreen } from "~/components/index.js";

export const SplashScreenVoting = () => {
  return (
    <SplashScreen>
      <Typography variant="h1">{text.match.voting}</Typography>
    </SplashScreen>
  );
};
