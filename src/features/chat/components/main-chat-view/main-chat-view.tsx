/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, type FC, useCallback, useEffect } from "react";
import { z } from "zod";
import { Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { type ChatMessagePayload } from "@/server/api/match-types";
import { api } from "@/utils/api";
import { pages } from "@/utils/router";
import {
  Timer,
  Decision,
  Messages,
  InputField,
} from "@/features/chat/components";
import { CHAT_TIME_SEC } from "@/constants";
import { styles } from "./styles";
import { useRouter } from "next/router";

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
  const [isFinished, setIsFinished] = useState(false);
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
        // TODO: Fix router
        console.error("Chat message error:", error);
        // void router.push(pages.home);
      },
    }
  );

  api.chat.onTimeout.useSubscription(
    { roomId },
    {
      onData() {
        // TODO: Fix routing
        void router.push(
          {
            pathname: pages.chat,
            query: { roomId: roomId, gameState: "Decision" },
          },
          undefined,
          {
            shallow: true,
          }
        );
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

  // TODO: Fix routing & state management
  const { query } = useRouter();

  const parse = z.string().safeParse(query.gameState);
  const gameState = parse.success ? parse.data : "";
  const isResults = gameState === "Results";

  return (
    <Stack component="section" sx={styles.section}>
      {isResults ? (
        <Decision />
      ) : (
        <>
          <Messages groupedMessages={groupedMessages} />
          <Timer
            matchDurationInSeconds={CHAT_TIME_SEC}
            setIsFinished={setIsFinished}
          />
          <InputField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onClick={() => sendMessage()}
            isFinished={isFinished}
          />
        </>
      )}
    </Stack>
  );
};
