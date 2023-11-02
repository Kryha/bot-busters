import { useState, type FC, useCallback, useEffect } from "react";
import { Stack } from "@mui/material";

import { styles } from "./styles";
import { Messages } from "../messages";
import { InputField } from "../input-field";
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
}

export const MainChatView: FC<Props> = ({ roomId }) => {
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

  return (
    <Stack component="section" sx={styles.section}>
      <Messages groupedMessages={groupedMessages} />
      <InputField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onClick={() => sendMessage()}
      />
    </Stack>
  );
};
