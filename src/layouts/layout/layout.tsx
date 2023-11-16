/* eslint-disable @typescript-eslint/unbound-method */
import { useState, type FC } from "react";
import { Container, type StackProps } from "@mui/material";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useSession } from "next-auth/react";

import { styles } from "./styles";
import { UserStats } from "./components/user-stats";

import { isVerifiedSession } from "@/utils/session";
import {
  fakeDateAndCreditsOne,
  fakeUsername,
} from "@/constants/fake-data/landing";

export const Layout: FC<StackProps> = (props) => {
  const { children } = props;
  const { data: sessionData } = useSession();
  const isVerifiedUser = isVerifiedSession(sessionData);
  const [open, setOpen] = useState(false);
  const { disconnect } = useWallet();
  const isGamePlayed = true;

  return (
    <Container component="main" sx={styles.container}>
      <UserStats
        isVerifiedUser={isVerifiedUser}
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
