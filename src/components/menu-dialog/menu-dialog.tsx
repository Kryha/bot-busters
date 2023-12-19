import { type FC, forwardRef, type ReactElement, type Ref } from "react";
import { Button, Dialog, Slide } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/router";

import { styles } from "./styles.js";
import { Footer } from "./footer.jsx";
import { Header } from "~/components/menu-dialog/header.jsx";
import { MenuOptions } from "~/components/menu-dialog/menu-options.jsx";
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
}

export const MenuDialog: FC<Props> = ({ open, setOpen }) => {
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
      <Header handleClose={handleClose} />
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
