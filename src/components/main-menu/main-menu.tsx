import { Button, Dialog, Slide } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/router";
import { type FC, forwardRef, type ReactElement, type Ref } from "react";

import { BotBustersIcon } from "~/assets/icons/index.js";
import { MenuOptions } from "~/components/main-menu/menu-options.jsx";
import { NavbarMenu } from "~/components/main-menu/navbar-menu.jsx";
import { styles } from "~/components/main-menu/styles.js";
import { usePlaySFX } from "~/hooks/sounds.js";
import { pages } from "~/router.js";
import { Footer } from "./footer.jsx";

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

export const MainMenu: FC<Props> = ({ open, setOpen }) => {
  const router = useRouter();
  const playSfx = usePlaySFX();

  const handleClose = () => {
    setOpen(false);
    void playSfx("Blip");
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
      <NavbarMenu handleClose={handleClose} />
      <Button
        variant="text"
        sx={styles.dialogLogo}
        onClick={() => {
          void playSfx("Blip");
          handleNavigation(pages.home);
        }}
      >
        <BotBustersIcon />
      </Button>
      <MenuOptions handleClose={handleClose} />
      <Footer handleClose={handleClose} />
    </Dialog>
  );
};
