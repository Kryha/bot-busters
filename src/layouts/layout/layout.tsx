import { useState, type FC } from "react";
import { Container, type StackProps } from "@mui/material";
import { useSession } from "next-auth/react";

import { styles } from "./styles";
import { UserStats } from "./components/user-stats";

import { isVerifiedSession } from "@/utils/session";
import { api } from "@/utils/api";
import { fakeUsername } from "@/constants/fake-data/landing";
import { useBBWallet } from "@/hooks/bb-wallet";

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
