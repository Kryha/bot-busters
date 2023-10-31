import { type FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { text } from "@/assets/text";
import { pages } from "@/utils/router";
import { styles } from "./styles";
import { UserMenu } from "../user-menu";

export const UserStats: FC = () => {
  const router = useRouter();
  return (
    <Stack sx={styles.statsWrapper}>
      {/* <Stack sx={{ flexDirection: "row", gap: 5 }}>
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="overline" color="blueGrey.main">
            {text.landing.yourScoreToday}
          </Typography>
          <Typography variant="h5" color="blueGrey.main">
            {text.landing.points(1230)}
          </Typography>
        </Stack>
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="overline" color="blueGrey.main">
            {text.landing.yourPosition}
          </Typography>
          <Typography variant="h5" color="blueGrey.main">
            {text.landing.numberPosition(43)}
          </Typography>
        </Stack>
      </Stack>
      <Stack sx={styles.statsContainer}>
        <Button
          variant="contained"
          size="medium"
          sx={styles.connectButton}
          onClick={() => void router.push(pages.login)}
          color="blueGrey"
        >
          {text.landing.connectLeoWallet}
        </Button>
        <Typography variant="body1" color="blueGrey.main">
          {text.landing.toPlayWith}
        </Typography>
      </Stack> */}
      <UserMenu />
    </Stack>
  );
};
