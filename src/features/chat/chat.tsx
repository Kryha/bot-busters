import { useMediaQuery } from "@mui/material";
import { type FC, useState } from "react";
import { ChatDrawer, MainChatView } from "./components";
import { contactListData } from "@/constants";

interface Props {
  roomId: string;
}

export const ChatView: FC<Props> = ({ roomId }) => {
  const [toggle, setToggle] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const showChat = () => {
    if (isSmallScreen) setToggle(!toggle);
    else {
      setToggle(true);
    }
  };

  return (
    <>
      <ChatDrawer
        open={toggle}
        toggle={showChat}
        contactList={contactListData}
      />
      <MainChatView
        open={toggle}
        roomId={roomId}
        isSmallScreen={isSmallScreen}
      />
    </>
  );
};
