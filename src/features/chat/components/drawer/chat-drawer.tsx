import { type FC } from "react";
import { Box, Drawer, Stack } from "@mui/material";

import { styles } from "./styles";
import { ChatList } from "./chat-list";
import { type ContactListData } from "@/types";

interface Props {
  open: boolean;
  toggle: () => void;
  contactList: ContactListData[];
}

export const ChatDrawer: FC<Props> = ({ open, toggle, contactList }) => {
  return (
    <Box component="section" sx={styles.nav}>
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
      <Stack sx={styles.drawerDesktop}>
        <ChatList toggle={toggle} contactList={contactList} />
      </Stack>
    </Box>
  );
};
