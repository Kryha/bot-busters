import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";

import { styles } from "./styles";
import { useRouter } from "next/router";
import { ChatDrawer, ChatToolBar, MainChatView } from "./components";
import { contactListData, messageData } from "@/constants";

export const ChatView = () => {
  // TODO: update component
  const [toggle, setToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const router = useRouter();

  const showChat = () => {
    if (isSmallScreen) setToggle(!toggle);
    else {
      setToggle(true);
    }
  };

  return (
    <>
      <ChatToolBar
        setToggle={() => setToggle(!toggle)}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        router={router}
      />
      <ChatDrawer
        open={toggle}
        toggle={showChat}
        contactList={contactListData}
      />
      <Box sx={styles.drawerHeader} />
      <MainChatView
        open={toggle}
        isSmallScreen={isSmallScreen}
        messages={messageData}
      />
    </>
  );
};
