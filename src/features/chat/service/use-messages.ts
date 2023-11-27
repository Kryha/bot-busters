import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { type ChatMessagePayload } from "~/server/api/match-types.js";
import { type GroupedMessage } from "~/types/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/utils/router.js";

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
    const isLocalSender = message.sender === session?.user.id;

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
