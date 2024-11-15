import { Button, Modal, Stack, Typography } from "@mui/material";
import { type FC } from "react";

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
  isOpen: boolean;
  onClose: () => void;
}

export const CoinbaseRewardModal: FC<Props> = ({
  pastSeason,
  userRank,
  isOpen,
  onClose,
}) => {
  const claimReward = api.coinbase.claimReward.useMutation();

  const handleClaimReward = async () => {
    if (!pastSeason) return;

    try {
      await claimReward.mutateAsync({ season: pastSeason });
      onClose();
    } catch (error) {
      // TODO: handle error properly
      console.error(error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => onClose()}
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
      </Stack>
    </Modal>
  );
};
