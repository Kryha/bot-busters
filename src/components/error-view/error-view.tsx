import { Stack, Typography } from "@mui/material";
import { usePlaySFX } from "~/hooks/sounds.js";

import { PageLayout } from "~/containers/page-layout/index.js";
import { AppContainer } from "~/containers/index.js";
import { errorMessage } from "~/constants/error-messages.js";

import { styles } from "./style.js";
import { PrimaryButton } from "../primary-button/index.js";
import { useRouter } from "next/router";
import { pages } from "~/router";

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const router = useRouter();
  const playSfx = usePlaySFX();
  const handleClick = () => {
    playSfx("BlipUp");
    resetErrorBoundary();
  };

  const handleNavigation = (path: string) => {
    playSfx("BlipUp");
    resetErrorBoundary();
    void router.push(path);
  };

  return (
    <AppContainer>
      <PageLayout title={errorMessage.generalHeading}>
        <Stack sx={styles.container}>
          <Typography variant="body1" sx={styles.errorMessage}>
            {error.message}
          </Typography>
          <Stack sx={styles.buttons}>
            <PrimaryButton onClick={handleClick}>
              {errorMessage.tryAgain}
            </PrimaryButton>
            <PrimaryButton onClick={() => handleNavigation(pages.home)}>
              {errorMessage.goHome}
            </PrimaryButton>
          </Stack>
        </Stack>
      </PageLayout>
    </AppContainer>
  );
}
