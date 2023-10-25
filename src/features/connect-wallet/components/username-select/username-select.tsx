import { type FC } from "react";
import Image from "next/image";
import { Stack } from "@mui/material";

import { BlurredLeaderboard } from "@/features/connect-wallet/assets";
import { useViewport } from "@/hooks/use-viewport";
import { CreateUsername } from "@/features/connect-wallet/components/create-username";

export const UsernameSelect: FC = () => {
  const { height } = useViewport();
  // TODO: finish component
  return (
    <Stack>
      <Image
        src={BlurredLeaderboard}
        alt="blurred-leaderboard"
        height={height}
      />
      <CreateUsername />
    </Stack>
  );
};
