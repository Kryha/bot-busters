import { type FC, useState } from "react";
import { Container, type StackProps } from "@mui/material";

import { api } from "~/utils/api.js";
import { Navbar } from "~/components/navbar/index.js";
import { styles } from "~/containers/app-container/styles.js";
import { isVerifiedUser } from "~/utils/user.js";

export const AppContainer: FC<StackProps> = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });

  return (
    <Container component="main" sx={styles.container}>
      <Navbar
        isVerifiedUser={isVerifiedUser(loggedUser.data)}
        username={loggedUser.data?.username}
        open={menuIsOpen}
        setOpen={setMenuIsOpen}
      />
      {children}
    </Container>
  );
};
