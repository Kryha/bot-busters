import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { default as spinner } from "~/assets/images/spinner.gif";
import { text } from "~/assets/text/index.js";
import { PageLayout } from "~/containers/page-layout/index.js";
import { processTextToLink } from "~/utils/links.jsx";
import { styles } from "./styles.js";

const SPINNER_SIZE = 34;
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
          <Image
            src={spinner}
            alt="spinner"
            width={SPINNER_SIZE}
            height={SPINNER_SIZE}
          />
        </Stack>
      </Stack>
    </PageLayout>
  );
};
