import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";

import { styles } from "./styles";
import { useRouter } from "next/router";
import { ChatDrawer, ChatToolBar, MainChatView } from "./components";
import { useGlobalStore } from "@/store";

export const ChatView = () => {
  // TODO: update component
  const [toggle, setToggle] = useState(false);
  const messages = useGlobalStore((state) => state.messages);
  const contactList = useGlobalStore((state) => state.contactList);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const router = useRouter();

  const showChat = () => {
    if (isSmallScreen) setToggle(!toggle);
    else {
      setToggle(true);
    }
  };

  if (!contactList.length || !messages.length) return null;

  return (
    <>
      <ChatToolBar
        setToggle={() => setToggle(!toggle)}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        router={router}
      />
      <ChatDrawer open={toggle} toggle={showChat} contactList={contactList} />
      <Box sx={styles.drawerHeader} />
      <MainChatView
        open={toggle}
        isSmallScreen={isSmallScreen}
        messages={messages}
      />
    </>
  );
};
