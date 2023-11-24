import { Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { SplashScreen } from "~/components/index.js";
import { useMatchState } from "~/service/index.js";

export const SplashScreenChat = () => {
  const matchState = useMatchState();
  const isChat = matchState === "chat";

  return (
    <SplashScreen show={isChat}>
      <Typography variant="h1">{text.match.chat}</Typography>
    </SplashScreen>
  );
};
