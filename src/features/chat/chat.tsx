import { Box, useMediaQuery } from "@mui/material";
import { type FC, useState, useEffect, useCallback } from "react";

import { styles } from "./styles";
import {
  ChatDrawer,
  ChatToolBar,
  type GroupedMessage,
  MainChatView,
} from "./components";
import { api } from "@/utils/api";
import { type ChatMessagePayload } from "@/server/api/routers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  roomId: string;
}

export const ChatView: FC<Props> = ({ roomId }) => {
  const router = useRouter();

  const [toggle, setToggle] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const { data: sessionData } = useSession();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);

  const groupedMessages: GroupedMessage[] = messages.map((message) => {
    const isLocalSender = message.sender === sessionData?.uuid;

    // TODO: group properly, use `sentAt`
    return {
      side: isLocalSender ? "right" : "left",
      messages: [message.message],
    };
  });

  const appendMessage = (newMessage: ChatMessagePayload) =>
    setMessages((prev) => [newMessage, ...prev]);

  const sendChatMessage = api.chat.sendMessage.useMutation();

  const sendMessage = useCallback(() => {
    if (!message) return;
    sendChatMessage.mutate({ message, sentAt: Date.now(), roomId });
    // TODO: append message immediately and show progress
    setMessage("");
  }, [message, roomId, sendChatMessage]);

  api.chat.onMessage.useSubscription(
    { roomId },
    {
      onData(payload) {
        appendMessage(payload);
      },
      onError(error) {
        console.error("Chat message error:", error);
        void router.push("/");
      },
    }
  );

  api.chat.onTimeout.useSubscription(
    { roomId },
    {
      onData() {
        void router.push("/decision");
      },
      onError(error) {
        console.error("Error on timeout:", error);
      },
    }
  );

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        sendMessage();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [sendMessage]);

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
