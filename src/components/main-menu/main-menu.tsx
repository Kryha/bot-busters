import { type FC, forwardRef, type ReactElement, type Ref } from "react";
import { Button, Dialog, Slide } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/router";

import { styles } from "~/components/main-menu/styles.js";
import { Footer } from "./footer.jsx";
import { NavbarMenu } from "~/components/main-menu/navbar-menu.jsx";
import { MenuOptions } from "~/components/main-menu/menu-options.jsx";
import { pages } from "~/router";
import { BotBustersIcon } from "~/assets/icons/index.js";

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
  soundOn: boolean;
  setSoundOn: (value: boolean) => void;
}

export const MainMenu: FC<Props> = ({ open, setOpen, soundOn, setSoundOn }) => {
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };

  const handleNavigation = (path: string) => {
    void router.push(path);
    handleClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={styles.dialog}
    >
      <NavbarMenu
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        handleClose={handleClose}
      />
      <Button
        variant="text"
        sx={styles.dialogLogo}
        onClick={() => handleNavigation(pages.home)}
      >
        <BotBustersIcon />
      </Button>
      <MenuOptions handleClose={handleClose} />
      <Footer handleClose={handleClose} />
    </Dialog>
  );
};
