import { type FC } from "react";
import { Button, IconButton, Stack } from "@mui/material";

import { text } from "~/assets/text/index.js";

import { SoundIcon } from "./sound-icon.jsx";
import { styles } from "./styles.js";

interface Props {
  isVerifiedUser: boolean;
  setOpen: (open: boolean) => void;
  logout: () => Promise<void>;
}

export const UserMenu: FC<Props> = ({ isVerifiedUser, setOpen, logout }) => {
  return (
    <Stack sx={styles.wrapper}>
      {isVerifiedUser && (
        <Button
          variant="contained"
          color="blueGrey"
          onClick={() => void logout()}
          sx={styles.button}
        >
          {text.general.signOut}
        </Button>
      )}
      <IconButton sx={styles.iconButton}>
        <SoundIcon />
      </IconButton>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {text.general.menu}
      </Button>
    </Stack>
  );
};
