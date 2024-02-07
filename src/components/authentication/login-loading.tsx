import { Stack, Typography } from "@mui/material";
import Image from "next/image";

import { text } from "~/assets/text/index.js";
import { default as spinner } from "~/assets/images/spinner.gif";

import { styles } from "./styles.js";

const SPINNER_SIZE = 34;

// TODO: update styles
export const LoginLoading = () => (
  <Stack sx={styles.wrapper}>
    <Stack sx={styles.container}>
      <Stack sx={styles.progress}>
        <Image
          src={spinner}
          alt="spinner"
          width={SPINNER_SIZE}
          height={SPINNER_SIZE}
        />
      </Stack>
      <Stack sx={styles.text}>
        <Typography variant="h5">{text.auth.weUseYourWallet}</Typography>
        <Typography variant="h5">{text.auth.weTransferToYourWallet}</Typography>
      </Stack>
    </Stack>
  </Stack>
);
