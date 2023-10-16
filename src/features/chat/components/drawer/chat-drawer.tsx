import { type FC } from "react";

import { styles } from "./styles";
import { ChatList } from "./chat-list";
import { Box, Drawer } from "@mui/material";

interface Props {
  open: boolean;
  toggle: () => void;
}

export const ChatDrawer: FC<Props> = ({ open, toggle }) => {
  return (
    <Box component="nav" sx={styles.nav}>
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={styles.drawerMobile}
      >
        <ChatList toggle={toggle} />
      </Drawer>
      <Drawer variant="permanent" sx={styles.drawerDesktop} open>
        <ChatList toggle={toggle} />
      </Drawer>
    </Box>
  );
};
