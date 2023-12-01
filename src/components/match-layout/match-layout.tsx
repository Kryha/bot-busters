import { Container } from "@mui/material";
import { type ReactNode, type FC } from "react";

import { styles } from "./styles.js";
import { SplashScreenChat } from "~/components/splash-screen-chat";
import { SplashScreenVoting } from "~/components/splash-screen-voting";

interface Props {
  splashScreenVariant?: "chat" | "voting";
  children: ReactNode;
}

export const MatchLayout: FC<Props> = ({ children, splashScreenVariant }) => {
  const splash = () => {
    switch (splashScreenVariant) {
      case "chat":
        return <SplashScreenChat />;
      case "voting":
        return <SplashScreenVoting />;
      default:
        return <></>;
    }
  };

  return (
    <Container component="section" sx={styles.container}>
      {splash()}
      {children}
    </Container>
  );
};
