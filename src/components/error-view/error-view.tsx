'use client';

import { Stack, Typography } from "@mui/material";

import { PageLayout } from "~/containers/page-layout";
import { PrimaryButton } from "../primary-button";
import { AppContainer } from "~/containers";

import { styles } from "./style.js";


const errorText = {
  notFound: "Hmmmm... Looks like this page doesn't exist.",
  unauthenticated:
    "Stop right there! This page is only for authenticated humans.",
  general: "Error",
  goBack: "Go Back",
};

export function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {  

  return (
    <AppContainer>
      <PageLayout title={errorText.general} />
      <Stack sx={styles.container} >
        <Typography variant="body1" sx={styles.errorMessage}>
          {error.message}
        </Typography>
        <PrimaryButton onClick={resetErrorBoundary}>
          {errorText.goBack}
        </PrimaryButton>
      </Stack>
    </AppContainer>
  );
};
