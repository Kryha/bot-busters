import { type FC, useEffect, useState } from "react";
import { Box, type StackProps } from "@mui/material";
import { Navbar } from "~/components/navbar/index.js";
import { useAndRequireContext } from "~/hooks/use-and-require-context.js";
import { ContextRef } from "~/containers/sound-provider/index.js";
import { useViewport } from "~/hooks/use-viewport.js";
import { MobileScreen } from "~/components/mobile-screen/index.js";
import { breakpoints } from "~/styles/index.js";
import { styles } from "~/containers/app-container/styles.js";

export const AppContainer: FC<StackProps> = ({ children }) => {
  const { mainContainerRef } = useAndRequireContext(
    ContextRef,
    "AppContainer",
    "sound-provider",
  );
  const { width } = useViewport();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (width) {
      setIsMobile(width <= breakpoints.md);
    }
  }, [width]);

  return (
    <Box ref={mainContainerRef} component="main" sx={styles.container}>
      {isMobile ? (
        <MobileScreen />
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
    </Box>
  );
};
