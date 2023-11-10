/* eslint-disable @typescript-eslint/unbound-method */
import { useState, type FC } from "react";
import { Stack, type StackProps } from "@mui/material";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useSession } from "next-auth/react";

import { styles } from "./styles";
import { UserStats } from "./components/user-stats";

import { isValidSession } from "@/utils/session";
import { fakeDateAndCreditsOne, fakeUsername } from "@/constants";

export const Layout: FC<StackProps> = (props) => {
  const { children } = props;
  const { data: sessionData } = useSession();
  const isAuthenticated = isValidSession(sessionData);
  const [open, setOpen] = useState(false);
  const { disconnect } = useWallet();
  const isGamePlayed = true;

  return (
    <Stack component="section" sx={styles.container}>
      <UserStats
        isAuthenticated={isAuthenticated}
        isGamePlayed={isGamePlayed}
        username={fakeUsername}
        open={open}
        setOpen={setOpen}
        disconnect={disconnect}
        points={fakeDateAndCreditsOne.credits}
      />
      {children}
    </Stack>
  );
};
