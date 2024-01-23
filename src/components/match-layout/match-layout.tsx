import { Container } from "@mui/material";
import { type FC, type ReactNode } from "react";
import { type PlayerType } from "~/types/index.js";
import { Interstitials } from "~/components/interstitials/index.js";
import { styles } from "./styles.js";

interface Props {
  splashScreenVariant?: "chat" | "voting";
  localPlayer: PlayerType;
  children: ReactNode;
}

export const MatchLayout: FC<Props> = ({
  children,
  splashScreenVariant,
  localPlayer,
}) => {
  return (
    <Container component="section" sx={styles.container}>
      <Interstitials
        splashScreenVariant={splashScreenVariant}
        localPlayer={localPlayer}
      />
      {children}
    </Container>
  );
};
