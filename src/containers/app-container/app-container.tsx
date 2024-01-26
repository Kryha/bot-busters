import { type FC, useState } from "react";
import { Container, type StackProps } from "@mui/material";

import { api } from "~/utils/api.js";
import { fakeUsername } from "~/constants/fake-data/landing.js";
import { Navbar } from "~/components/navbar/index.js";
import { styles } from "~/containers/app-container/styles.js";

export const AppContainer: FC<StackProps> = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });

  const playerPoints = loggedUser.data?.score ?? 0;
  const isVerifiedUser = !!(
    loggedUser.data?.address && loggedUser.data.username
  );

  return (
    <Container component="main" sx={styles.container}>
      <Navbar
        isVerifiedUser={isVerifiedUser}
        username={loggedUser.data?.username ?? fakeUsername}
        open={menuIsOpen}
        setOpen={setMenuIsOpen}
        points={playerPoints}
      />
      {children}
    </Container>
  );
};
