import { Box, Divider, List } from "@mui/material";
import { drawerItems } from "./drawer-items";
import { styles } from "./styles";
import { ChatListToolbar } from "../chat-list-toolbar";
import { ChatListItem } from "../chat-list";

export const ChatList = () => {
  // TODO: update styles and content
  return (
    <Box>
      <ChatListToolbar />
      <List sx={styles.list}>
        {drawerItems.map((item, index) => (
          <>
            <ChatListItem
              time={item.time}
              username={item.username}
              AvatarImage={item.image}
              lastMessage={item.lastMessage}
              key={index}
            />
            <Divider variant="inset" component="li" sx={styles.divider} />
          </>
        ))}
      </List>
    </Box>
  );
};
