/* eslint-disable @typescript-eslint/unbound-method */
import { useState, type FC } from "react";
import { Container, type StackProps } from "@mui/material";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useSession } from "next-auth/react";

import { styles } from "./styles";
import { UserStats } from "./components/user-stats";

import { isUnverifiedSession, isVerifiedSession } from "@/utils/session";
import { fakeUsername } from "@/constants";
import { api } from "@/utils/api";

export const Layout: FC<StackProps> = (props) => {
  const { children } = props;
  const { data: sessionData } = useSession();
  const isWalletConnected =
    isVerifiedSession(sessionData) || isUnverifiedSession(sessionData);
  const [open, setOpen] = useState(false);
  const { disconnect } = useWallet();
  const { data } = api.user.getUserById.useQuery();
  const PlayerPoints = data?.score ? data.score : 0;
  const isGamePlayed = true;

  return (
    <Container component="main" sx={styles.container}>
      <UserStats
        isWalletConnected={isWalletConnected}
        isGamePlayed={isGamePlayed}
        username={
          sessionData?.user.username ? sessionData.user.username : fakeUsername
        }
        open={open}
        setOpen={setOpen}
        disconnect={disconnect}
        points={PlayerPoints}
      />
      {children}
    </Container>
  );
};
