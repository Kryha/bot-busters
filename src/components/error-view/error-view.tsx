import { Stack, Typography } from "@mui/material";

import { PageLayout } from "~/containers/page-layout/index.js";
import { AppContainer } from "~/containers/index.js";
import { errorMessage } from "~/constants/error-messages.js";

import { styles } from "./style.js";
import { PrimaryButton } from "../primary-button/index.js";
import { usePlaySFX } from "~/hooks/sounds";

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const playSfx = usePlaySFX();
  const handleClick = () => {
    playSfx("BlipUp");
    resetErrorBoundary();
  };
  return (
    <AppContainer>
      <PageLayout title={errorMessage.generalHeading} />
      <Stack sx={styles.container}>
        <Typography variant="body1" sx={styles.errorMessage}>
          {error.message}
        </Typography>
        <PrimaryButton onClick={handleClick}>
          {errorMessage.tryAgain}
        </PrimaryButton>
      </Stack>
    </AppContainer>
  );
}
