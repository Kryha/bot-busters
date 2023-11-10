import { type FC } from "react";
import { Button, IconButton, Stack } from "@mui/material";

import { text } from "@/assets/text";
import { SoundIcon } from "./sound-icon";
import { styles } from "./styles";

interface Props {
  setOpen: (open: boolean) => void;
}

export const UserMenu: FC<Props> = ({ setOpen }) => {
  return (
    <Stack sx={styles.wrapper}>
      <IconButton sx={styles.iconButton}>
        <SoundIcon />
      </IconButton>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {text.general.menu}
      </Button>
    </Stack>
  );
};
