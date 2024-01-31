import { type FC, useState } from "react";
import { Container, type StackProps } from "@mui/material";

import { Navbar } from "~/components/navbar/index.js";
import { styles } from "~/containers/app-container/styles.js";
export const AppContainer: FC<StackProps> = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <Container component="main" sx={styles.container}>
      <Navbar open={menuIsOpen} setOpen={setMenuIsOpen} />
      {children}
    </Container>
  );
};
