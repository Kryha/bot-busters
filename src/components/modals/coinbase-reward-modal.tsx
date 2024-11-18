import { Button, Modal, Stack, Typography } from "@mui/material";
import { TRPCError } from "@trpc/server";
import { useState, type FC } from "react";

import { type SxStyleRecord } from "~/types/sx-style-record.js";
import { text } from "~/assets/text/index.js";
import { api } from "~/utils/api.js";
import { theme } from "~/styles/index.js";

const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    padding: 10,
  },
} satisfies SxStyleRecord;

interface Props {
  pastSeason: number;
  userRank: number;
}

export const CoinbaseRewardModal: FC<Props> = ({ pastSeason, userRank }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const claimReward = api.coinbase.claimReward.useMutation();

  const handleClose = () => setIsOpen(false);

  const handleClaimReward = async () => {
    if (!pastSeason) return;

    setErrorMessage("");

    try {
      await claimReward.mutateAsync({ season: pastSeason });
      handleClose();
    } catch (error) {
      console.error(error);

      if (error instanceof TRPCError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(text.general.error);
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={styles.modal}
    >
      <Stack sx={styles.container}>
        <Typography variant="h3">{text.coinbaseReward.claimReward}</Typography>
        <Typography>{text.coinbaseReward.youReachedRank(userRank)}</Typography>
        <Button
          onClick={() => void handleClaimReward()}
          disabled={claimReward.isLoading}
        >
          {text.coinbaseReward.claimNow}
        </Button>
        <Typography>{errorMessage}</Typography>
      </Stack>
    </Modal>
  );
};
