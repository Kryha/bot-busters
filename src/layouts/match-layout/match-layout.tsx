import { Container, type StackProps } from "@mui/material";
import { type FC } from "react";

import { styles } from "./styles.js";
import { SplashScreenChat, SplashScreenVoting } from "./components/index.js";

export const MatchLayout: FC<StackProps> = ({ children }) => {
  return (
    <Container component="section" sx={styles.container}>
      <SplashScreenChat />
      <SplashScreenVoting />
      {children}
    </Container>
  );
};
