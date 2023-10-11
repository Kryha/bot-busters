import { type FC } from "react";
import { Box, Divider, List } from "@mui/material";
import { styles } from "./styles";

import { ChatListToolbar } from "../chat-list-toolbar";
import { ChatListItem } from "../chat-list";
import { type ContactList } from "@/types";

interface Props {
  toggle: () => void;
  contactList: ContactList[];
}

export const ChatList: FC<Props> = ({ toggle, contactList }) => {
  // TODO: update styles and content
  return (
    <Box>
      <ChatListToolbar />
      <List sx={styles.list}>
        {contactList.map((contact, index) => (
          <Box key={index} onClick={() => toggle()}>
            <ChatListItem contactList={contact} />
            <Divider variant="inset" component="li" sx={styles.divider} />
          </Box>
        ))}
      </List>
    </Box>
  );
};
