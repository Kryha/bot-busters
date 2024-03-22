import { Dialog, Slide } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { type FC, forwardRef, type ReactElement, type Ref } from "react";
import { usePlaySFX } from "~/hooks/sounds.js";
import { MenuOptions } from "~/components/main-menu/menu-options.jsx";
import { NavbarMenu } from "~/components/main-menu/navbar-menu.jsx";
import { Footer } from "./footer.jsx";
import { styles } from "~/components/main-menu/styles.js";

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
  const playSfx = usePlaySFX();

  const handleClose = () => {
    setOpen(false);
    void playSfx("Blip");
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
      <MenuOptions handleClose={handleClose} />
      <Footer handleClose={handleClose} />
    </Dialog>
  );
};
