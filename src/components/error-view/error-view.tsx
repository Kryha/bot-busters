import { Stack, Typography } from "@mui/material";

import { PageLayout } from "~/containers/page-layout";
import { AppContainer } from "~/containers";
import { errorMessage } from "~/constants/error-messages";

import { PrimaryButton } from "../primary-button";
import { styles } from "./style.js";

export function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <AppContainer>
      <PageLayout title={errorMessage.generalHeading} />
      <Stack sx={styles.container} >
        <Typography variant="body1" sx={styles.errorMessage}>
          {error.message}
        </Typography>
        <PrimaryButton onClick={resetErrorBoundary}>
          {errorMessage.tryAgain}
        </PrimaryButton>
      </Stack>
    </AppContainer>
  );
};
