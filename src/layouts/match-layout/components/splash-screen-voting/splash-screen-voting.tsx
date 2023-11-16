import { text } from "@/assets/text";
import { SplashScreen } from "@/components";
import { useStore } from "@/store";
import { Typography } from "@mui/material";

export const SplashScreenVoting = () => {
  const matchState = useStore((state) => state.matchState);
  const isVoting = matchState === "voting";

  return (
    <SplashScreen show={isVoting}>
      <Typography variant="h1">{text.match.voting}</Typography>
    </SplashScreen>
  );
};
