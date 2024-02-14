import { type FC } from "react";
import { Container, type StackProps } from "@mui/material";
import { Navbar } from "~/components/navbar/index.js";
import { styles } from "~/containers/app-container/styles.js";
import { useAndRequireContext } from "~/hooks/use-and-require-context.js";
import { SoundContextRef } from "~/containers/sound-provider/index.js";

export const AppContainer: FC<StackProps> = ({ children }) => {
  const { mainContainerRef } = useAndRequireContext(
    SoundContextRef,
    "AppContainer",
    "sound-provider",
  );

  return (
    <Container ref={mainContainerRef} component="main" sx={styles.container}>
      <Navbar />
      {children}
    </Container>
  );
};
