import { type FC } from "react";
import { Container, type StackProps } from "@mui/material";

import { Navbar } from "~/components/navbar/index.js";
import { styles } from "~/containers/app-container/styles.js";

export const AppContainer: FC<StackProps> = ({ children }) => {
  return (
    <Container component="main" sx={styles.container}>
      <Navbar />
      {children}
    </Container>
  );
};
