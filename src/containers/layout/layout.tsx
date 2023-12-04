import { type FC, useState } from "react";
import { Container, type StackProps } from "@mui/material";
import { useSession } from "next-auth/react";

import { isVerifiedSession } from "~/utils/session.js";
import { api } from "~/utils/api.js";
import { fakeUsername } from "~/constants/fake-data/landing.js";
import { useBBWallet } from "~/service/bb-wallet.js";

import { styles } from "./styles.js";
import { UserStats } from "~/components/user-stats";

export const Layout: FC<StackProps> = ({ children }) => {
  const { data: sessionData } = useSession();
  const isVerifiedUser = isVerifiedSession(sessionData);
  const [open, setOpen] = useState(false);
  const { disconnect } = useBBWallet();
  const { data } = api.user.getUserById.useQuery();
  const playerPoints = data?.score ? data.score : 0;
  const isGamePlayed = true;

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
