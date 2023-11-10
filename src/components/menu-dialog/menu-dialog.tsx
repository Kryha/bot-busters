import { type ReactElement, type Ref, forwardRef, type FC } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { type TransitionProps } from "@mui/material/transitions";
import { Button, Stack } from "@mui/material";

import { text } from "@/assets/text";
import { styles } from "./styles";
import { Footer } from "./footer";
import { MenuOptions } from "./menu-options";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  isAuthenticated: boolean;

  setOpen: (open: boolean) => void;
}

export const MenuDialog: FC<Props> = ({ open, isAuthenticated, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={styles.dialog}
    >
      <Stack sx={styles.buttonWrapper}>
        <Button variant="contained" sx={styles.button} onClick={handleClose}>
          {text.general.close}
        </Button>
      </Stack>
      <MenuOptions isAuthenticated={isAuthenticated} />
      <Footer />
    </Dialog>
  );
};
