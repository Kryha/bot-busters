import { type FC } from "react";
import { Chip, Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { type PayoutData } from "~/types/index.js";

import { styles } from "./styles.js";

interface Props {
  payout: PayoutData;
  fontWeight: string;
}

export const Payout: FC<Props> = ({ payout, fontWeight }) => {
  switch (payout.state) {
    case "new":
      return (
        <Stack sx={styles.payout}>
          <Typography fontWeight={fontWeight} color="customGrey.main">
            {text.playerProfile.credits(payout.credits)}
          </Typography>
          <Chip
            label={text.playerProfile.new}
            color="warning"
            sx={styles.chip}
          />
        </Stack>
      );

    case "potential":
      return (
        <Typography fontWeight={fontWeight} color="customGrey.main">
          {text.playerProfile.potentialCredits(payout.credits)}
        </Typography>
      );
    case "noPayout":
      return (
        <Typography fontWeight={fontWeight} color="customGrey.main">
          {text.playerProfile.noCredits}
        </Typography>
      );
    default:
      return (
        <Typography fontWeight={fontWeight} color="customGrey.main">
          {text.playerProfile.noCredits}
        </Typography>
      );
  }
};
