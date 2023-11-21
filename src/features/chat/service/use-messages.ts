import { type ChatMessagePayload } from "@/server/api/match-types";
import { type GroupedMessage } from "@/types";
import { api } from "@/utils/api";
import { pages } from "@/utils/router";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

interface Params {
  roomId: string;
}

export const useMessages = ({ roomId }: Params) => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);

  const appendMessage = (newMessage: ChatMessagePayload) => {
    setMessages((prev) => [newMessage, ...prev]);
  };

  const groupedMessages: GroupedMessage[] = messages.map((message) => {
    const isLocalSender = message.sender === session?.id;

    // TODO: group properly, use `sentAt`
    return {
      isLocalSender,
      messages: [message.message],
    };
  });

  api.chat.onMessage.useSubscription(
    { roomId },
    {
      onData(payload) {
        appendMessage(payload);
      },
      onError(error) {
        console.error("Chat message error:", error);
        void push(pages.home);
      },
    }
  );

  return groupedMessages;
};
