import { Container, type StackProps } from "@mui/material";
import { type FC } from "react";

import { styles } from "./styles.js";
import { SplashScreenChat } from "~/components/splash-screen-chat";
import { SplashScreenVoting } from "~/components/splash-screen-voting";

export const MatchLayout: FC<StackProps> = ({ children }) => {
  return (
    <Container component="section" sx={styles.container}>
      <SplashScreenChat />
      <SplashScreenVoting />
      {children}
    </Container>
  );
};
