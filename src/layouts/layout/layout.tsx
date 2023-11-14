/* eslint-disable @typescript-eslint/unbound-method */
import { useState, type FC } from "react";
import { Container, type StackProps } from "@mui/material";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useSession } from "next-auth/react";

import { styles } from "./styles";
import { UserStats } from "./components/user-stats";

import {
  isUnverifiedSession,
  isValidSession,
  isVerifiedSession,
} from "@/utils/session";
import { fakeDateAndCreditsOne, fakeUsername } from "@/constants";

export const Layout: FC<StackProps> = (props) => {
  const { children } = props;
  const { data: sessionData } = useSession();
  const isWalletConnected =
    isVerifiedSession(sessionData) || isUnverifiedSession(sessionData);
  const [open, setOpen] = useState(false);
  const { disconnect } = useWallet();
  const isGamePlayed = true;

  return (
    <Container component="main" sx={styles.container}>
      <UserStats
        isWalletConnected={isWalletConnected}
        isGamePlayed={isGamePlayed}
        username={fakeUsername}
        open={open}
        setOpen={setOpen}
        disconnect={disconnect}
        points={fakeDateAndCreditsOne.credits}
      />
      {children}
    </Container>
  );
};
