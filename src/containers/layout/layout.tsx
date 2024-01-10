import { type FC, useState, useEffect } from "react";
import { Container, type StackProps } from "@mui/material";
import { useSession } from "next-auth/react";

import {
  isAnonymousSession,
  isUnverifiedSession,
  isVerifiedSession,
} from "~/utils/session.js";
import { api } from "~/utils/api.js";
import { fakeUsername } from "~/constants/fake-data/landing.js";
import { useBBWallet } from "~/service/bb-wallet.js";
import { UserStats } from "~/components/user-stats/index.js";

import { styles } from "./styles.js";
import { useRouter } from "next/router.js";
import { pages } from "~/router.js";

export const Layout: FC<StackProps> = ({ children }) => {
  const { data: sessionData } = useSession();
  const { push } = useRouter();
  const isVerifiedUser = isVerifiedSession(sessionData);
  const [open, setOpen] = useState(false);
  const { disconnect } = useBBWallet();
  const { data } = api.user.getUserById.useQuery();
  const playerPoints = data?.score ? data.score : 0;
  const isGamePlayed = true;

  useEffect(() => {
    if (!sessionData || isVerifiedUser || isAnonymousSession(sessionData))
      return;
    if (isUnverifiedSession(sessionData)) void push(pages.usernameSelect);
  }, [sessionData]);

  return (
    <Container component="main" sx={styles.container}>
      <UserStats
        isVerifiedUser={isVerifiedUser}
        isGamePlayed={isGamePlayed}
        username={
          sessionData?.user.username ? sessionData.user.username : fakeUsername
        }
        open={open}
        setOpen={setOpen}
        disconnect={disconnect}
        points={playerPoints}
      />
      {children}
    </Container>
  );
};
