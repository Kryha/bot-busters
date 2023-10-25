import { Stack, Typography } from "@mui/material";
import { type FC } from "react";
import { text } from "./assets";

export const WalletConnect: FC = () => {
  return (
    <Stack>
      <Typography variant="h5">{text.connectYourWallet}</Typography>
      <Stack>
        <Typography variant="h5">{text.weUseYouWallet}</Typography>
        <Typography variant="h5">{text.weTransferToYourWallet}</Typography>
      </Stack>
    </Stack>
  );
};
