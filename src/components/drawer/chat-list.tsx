import { Box, Divider, List } from "@mui/material";
import { drawerItems } from "./drawer-items";
import { styles } from "./styles";
import { ChatListToolbar } from "../chat-list-toolbar";
import { ChatListItem } from "../chat-list";
import { type FC } from "react";

interface Props {
  toggle: () => void;
}

export const ChatList: FC<Props> = ({ toggle }) => {
  // TODO: update styles and content
  return (
    <Box>
      <ChatListToolbar />
      <List sx={styles.list}>
        {drawerItems.map((item, index) => (
          <Box key={index} onClick={() => toggle()}>
            <ChatListItem
              time={item.time}
              username={item.username}
              AvatarImage={item.image}
              lastMessage={item.lastMessage}
            />
            <Divider variant="inset" component="li" sx={styles.divider} />
          </Box>
        ))}
      </List>
    </Box>
  );
};
