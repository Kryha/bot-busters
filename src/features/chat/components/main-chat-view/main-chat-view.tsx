import { useState, type FC, useCallback, useEffect } from "react";
import { Stack, Typography } from "@mui/material";

import { styles } from "./styles";
import { AllMessages } from "../messages";
import { text } from "@/assets/text";
import { Input } from "../input";
import { useSession } from "next-auth/react";
import { type ChatMessagePayload } from "@/server/api/routers";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { pages } from "@/utils/router";
export interface GroupedMessage {
  messages?: string[];
  isLocalSender?: boolean;
}
interface Props {
  roomId: string;
  open: boolean;
  isSmallScreen: boolean;
}

export const MainChatView: FC<Props> = ({ open, roomId, isSmallScreen }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);

  const groupedMessages: GroupedMessage[] = messages.map((message) => {
    const isLocalSender = message.sender === sessionData?.id;

    // TODO: group properly, use `sentAt`
    return {
      isLocalSender,
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
        void router.push(pages.home);
      },
    }
  );

  api.chat.onTimeout.useSubscription(
    { roomId },
    {
      onData() {
        void router.push(pages.decision);
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

  console.log({ groupedMessages });

  if (!isSmallScreen && !open)
    return <Typography variant="h2">{text.general.clickChat}</Typography>;

  return (
    <Stack component="section" sx={styles.section}>
      <AllMessages groupedMessages={groupedMessages} />
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onClick={() => sendMessage()}
      />
    </Stack>
  );
};
