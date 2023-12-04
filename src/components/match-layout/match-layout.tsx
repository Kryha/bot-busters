import { Container } from "@mui/material";
import { type ReactNode, type FC } from "react";

import { SplashScreenChat } from "~/components/splash-screen-chat/index.js";
import { SplashScreenVoting } from "~/components/splash-screen-voting/index.js";

import { styles } from "./styles.js";

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
