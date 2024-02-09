import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { text } from "~/assets/text/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";
import { PageLayout } from "~/containers/page-layout/index.js";
import { processTextToLink } from "~/utils/links.jsx";

export const LoginLoading = () => {
  const router = useRouter();

  return (
    <PageLayout title={text.auth.connectWallet}>
      <Stack alignItems="center" gap={4}>
        <Stack alignItems="center" gap={2}>
          <Typography variant="body1">
            {processTextToLink(text.auth.loginDescription, text.wordsToLink)}
          </Typography>
        </Stack>

        <PrimaryButton
          variant="contained"
          color="blueGrey"
          onClick={() => void router.reload()}
        >
          {text.playerProfile.connectWallet}
        </PrimaryButton>
      </Stack>
    </PageLayout>
  );
};
