import { text } from "@/assets/text";
import { SplashScreen } from "@/components";
import { useStore } from "@/store";
import { Typography } from "@mui/material";

export const SplashScreenChat = () => {
  const matchState = useStore((state) => state.matchState);
  const isChat = matchState === "chat";

  return (
    <SplashScreen show={isChat}>
      <Typography variant="h1">{text.match.chat}</Typography>
    </SplashScreen>
  );
};
