import { Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { SplashScreen } from "~/components/index.js";

// TODO: find a way to combine this with SplashScreenVoting
export const SplashScreenChat = () => {
  return (
    <SplashScreen>
      <Typography aria-label={"start-chatting"} variant="h1">
        {text.match.chat}
      </Typography>
    </SplashScreen>
  );
};
