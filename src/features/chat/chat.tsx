import { Box, useMediaQuery } from "@mui/material";
import { type FC, useState } from "react";

import { styles } from "./styles";
import { useRouter } from "next/router";
import {
  ChatDrawer,
  ChatToolBar,
  type GroupedMessage,
  MainChatView,
} from "./components";
import { api } from "@/utils/api";
import { type ChatMessagePayload } from "@/server/api/routers";
import { useSession } from "next-auth/react";

interface Props {
  roomId: string;
}

export const ChatView: FC<Props> = ({ roomId }) => {
  const [toggle, setToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const router = useRouter();

  const { data: sessionData } = useSession();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);

  const groupedMessages: GroupedMessage[] = messages.map((message) => {
    const isLocalSender = message.sender === sessionData?.address;

    // TODO: group properly, use `sentAt`
    return {
      side: isLocalSender ? "right" : "left",
      messages: [message.message],
    };
  });

  const appendMessage = (newMessage: ChatMessagePayload) =>
    setMessages((prev) => [...prev, newMessage]);

  const sendChatMessage = api.lobby.sendChatMessage.useMutation();

  const sendMessage = () => {
    console.log("attempting send...");
    if (!message) return;
    console.log("sending...");
    sendChatMessage.mutate({ message, sentAt: Date.now(), roomId });
    // TODO: append message immediately and show progress
    setMessage("");
  };

  api.lobby.onChatMessage.useSubscription(
    { roomId },
    {
      onData(payload) {
        appendMessage(payload);
      },
      onError(error) {
        // TODO: redirect if user does not belong to the chat
        console.error("Chat message error:", error);
      },
    }
  );

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

      <ChatDrawer open={toggle} toggle={showChat} />
      <Box sx={styles.drawerHeader} />

      <MainChatView
        open={toggle}
        isSmallScreen={isSmallScreen}
        messages={groupedMessages}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </>
  );
};
