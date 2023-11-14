import { type FC } from "react";
import { Button, IconButton, Stack } from "@mui/material";

import { text } from "@/assets/text";
import { SoundIcon } from "./sound-icon";
import { styles } from "./styles";

interface Props {
  isWalletConnected: boolean;
  setOpen: (open: boolean) => void;
  logout: () => Promise<void>;
}

export const UserMenu: FC<Props> = ({ isWalletConnected, setOpen, logout }) => {
  return (
    <Stack sx={styles.wrapper}>
      {isWalletConnected && (
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
