import { type FC } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

import { text } from "@/assets/text";
import { pages } from "@/utils/router";
import { Points } from "./points";
import { styles } from "./styles";

interface Props {
  isGamePlayed: boolean;
  points?: number;
  position?: number;
}

export const Stats: FC<Props> = ({
  isGamePlayed,
  points = 0,
  position = 0,
}) => {
  const router = useRouter();

  return (
    <Stack sx={styles.stack}>
      <Points isGamePlayed={isGamePlayed} points={points} position={position} />
      <Stack sx={styles.statsContainer}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => void router.push(pages.login)}
          color="blueGrey"
        >
          {text.landing.connectLeoWallet}
        </Button>
        <Typography variant="body1" color="blueGrey.main">
          {text.landing.toPlayWith}
        </Typography>
      </Stack>
    </Stack>
  );
};
