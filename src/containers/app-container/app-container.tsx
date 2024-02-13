import { type FC, useState } from "react";
import { Container, type StackProps } from "@mui/material";

import { Navbar } from "~/components/navbar/index.js";
import { styles } from "~/containers/app-container/styles.js";
import { useAndRequireContext } from "~/hooks/use-and-require-context";
import { ContextRef } from "~/containers/sound-provider";

export const AppContainer: FC<StackProps> = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { mainContainerRef } = useAndRequireContext(ContextRef);

  return (
    <Container ref={mainContainerRef} component="main" sx={styles.container}>
      <Navbar open={menuIsOpen} setOpen={setMenuIsOpen} />
      {children}
    </Container>
  );
};
