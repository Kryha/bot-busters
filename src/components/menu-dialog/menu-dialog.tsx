import { type FC, forwardRef, type ReactElement, type Ref } from "react";
import { Button, Dialog, Slide, Stack } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";

import { text } from "~/assets/text/index.js";
import { styles } from "./styles.js";
import { Footer } from "./footer.jsx";
import { MenuOptions } from "./menu-options.jsx";
import { useRouter } from "next/router";
import { pages } from "~/router.js";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

interface Props {
  open: boolean;

  setOpen: (open: boolean) => void;
}

export const MenuDialog: FC<Props> = ({ open, setOpen }) => {
  const { push } = useRouter();

  const goHome = () => {
    setOpen(false);
    void push(pages.home);
  };

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
        <Button variant="contained" sx={styles.button} onClick={goHome}>
          {text.general.home}
        </Button>
        <Button variant="contained" sx={styles.button} onClick={handleClose}>
          {text.general.close}
        </Button>
      </Stack>
      <MenuOptions handleClose={handleClose} />
      <Footer handleClose={handleClose} />
    </Dialog>
  );
};
