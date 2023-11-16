import { Container, type StackProps } from "@mui/material";
import { type FC } from "react";
import { styles } from "./styles";
import { SplashScreenChat, SplashScreenVoting } from "./components";

export const MatchLayout: FC<StackProps> = ({ children }) => {
  return (
    <Container component="section" sx={styles.container}>
      <SplashScreenChat />
      <SplashScreenVoting />
      {children}
    </Container>
  );
};
