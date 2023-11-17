/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, type FC, useCallback, useEffect } from "react";
import { Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import {
  type ChatRoom,
  type ChatMessagePayload,
} from "@/server/api/match-types";
import { api } from "@/utils/api";
import { pages } from "@/utils/router";
import { useRouter } from "next/router";
import { styles } from "./styles";
import { InputField, Messages, Timer } from "./components";
import { type MatchStateType, type GroupedMessage } from "@/types";
import { CHAT_TIME_MS } from "@/constants";

interface Props {
  roomId: string;
  matchState: MatchStateType;
  room: ChatRoom;
}

export const Chat: FC<Props> = ({ roomId, matchState, room }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);

  const isChat = matchState === "chat";

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
        // TODO: Add onTimeout handler
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
    <Stack component="section" sx={styles.section(isChat)}>
      <Messages groupedMessages={groupedMessages} />
      <Timer time={room.createdAt} duration={CHAT_TIME_MS} />
      <InputField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onClick={() => sendMessage()}
        disabled={!isChat}
      />
    </Stack>
  );
};
