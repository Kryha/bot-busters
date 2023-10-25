import { type FC } from "react";
import Image from "next/image";
import { Stack, Typography } from "@mui/material";

import spinner from "@/assets/images/spinner.gif";
import { styles } from "./styles";
import { text } from "@/features/connect-wallet/assets";

export const ConnectPlaceholder: FC = () => {
  const spinnerSize = 34;

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <Stack sx={styles.progress}>
          <Typography variant="h5">{text.connectYourWallet}</Typography>
          <Image
            src={spinner}
            alt="spinner"
            width={spinnerSize}
            height={spinnerSize}
          />
        </Stack>
        <Stack sx={styles.text}>
          <Typography variant="h5">{text.weUseYouWallet}</Typography>
          <Typography variant="h5">{text.weTransferToYourWallet}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
