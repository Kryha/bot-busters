import { type FC } from "react";
import { Box, Drawer } from "@mui/material";

import { styles } from "./styles";
import { ChatList } from "./chat-list";
import { type ContactList } from "@/types";

interface Props {
  open: boolean;
  toggle: () => void;
  contactList: ContactList[];
}

export const ChatDrawer: FC<Props> = ({ open, toggle, contactList }) => {
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
        <ChatList toggle={toggle} contactList={contactList} />
      </Drawer>
      <Drawer variant="permanent" sx={styles.drawerDesktop} open>
        <ChatList toggle={toggle} contactList={contactList} />
      </Drawer>
    </Box>
  );
};
