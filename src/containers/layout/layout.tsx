import { type FC, useState } from "react";
import { Container, type StackProps } from "@mui/material";
import { useSession } from "next-auth/react";

import { isVerifiedSession } from "~/utils/session.js";
import { api } from "~/utils/api.js";
import { fakeUsername } from "~/constants/fake-data/landing.js";
import { useBBWallet } from "~/service/bb-wallet.js";
import { Navbar } from "~/components/navbar/index.js";
import { styles } from "./styles.js";

export const Layout: FC<StackProps> = ({ children }) => {
  const { data: sessionData } = useSession();
  const isVerifiedUser = isVerifiedSession(sessionData);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { disconnect } = useBBWallet();
  const { data } = api.user.getUserById.useQuery();
  const playerPoints = data?.score ? data.score : 0;
  const isGamePlayed = true;

  return (
    <Container component="main" sx={styles.container}>
      <Navbar
        isVerifiedUser={isVerifiedUser}
        isGamePlayed={isGamePlayed}
        username={
          sessionData?.user.username ? sessionData.user.username : fakeUsername
        }
        open={menuIsOpen}
        setOpen={setMenuIsOpen}
        disconnect={disconnect}
        points={playerPoints}
      />
      {children}
    </Container>
  );
};
