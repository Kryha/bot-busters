import { CircularProgress, Stack, Typography } from "@mui/material";
import { text } from "~/assets/text/index.js";
import { PageLayout } from "~/containers/page-layout/index.js";
import { processTextToLink } from "~/utils/links.jsx";
import { styles } from "./styles.js";

export const LoginLoading = () => {
  return (
    <PageLayout title={text.auth.connectWallet}>
      <Stack alignItems="center" gap={4}>
        <Stack alignItems="center" gap={2}>
          <Typography variant="body1">
            {processTextToLink(text.auth.loginDescription, text.wordsToLink)}
          </Typography>
        </Stack>

        <Stack sx={styles.progress}>
          <Stack width="100%" pt="10vh" alignItems="center">
            <CircularProgress />
          </Stack>
        </Stack>
      </Stack>
    </PageLayout>
  );
};
