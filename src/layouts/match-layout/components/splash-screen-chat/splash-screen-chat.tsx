import { Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { SplashScreen } from "~/components/index.js";

export const SplashScreenChat = () => {
  return (
    <SplashScreen>
      <Typography variant="h1">{text.match.chat}</Typography>
    </SplashScreen>
  );
};
