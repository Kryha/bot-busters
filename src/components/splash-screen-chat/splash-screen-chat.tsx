import { Typography } from "@mui/material";

import { text } from "~/assets/text";
import { SplashScreen } from "~/components";
import { useMatchState } from "~/service";

export const SplashScreenChat = () => {
  const matchState = useMatchState();
  const isChat = matchState === "chat";

  return (
    <SplashScreen show={isChat}>
      <Typography variant="h1">{text.match.chat}</Typography>
    </SplashScreen>
  );
};
