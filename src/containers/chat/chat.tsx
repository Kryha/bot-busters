import { type FC, type KeyboardEvent, useState } from "react";
import { Stack } from "@mui/material";

import {
  type ChatMessagePayload,
  type ChatRoom,
} from "~/server/api/match-types.js";
import { api } from "~/utils/api.js";
import { type GroupedMessage, type MatchStateType } from "~/types";
import { CHAT_TIME_MS } from "~/constants";
import { styles } from "./styles.js";
import { useRouter } from "next/router";
import { pages } from "~/router";
import { useSession } from "next-auth/react";
import { InputField } from "~/components/input-field";
import { Messages } from "~/components/messages";
import { Timer } from "~/components/timer";

interface Props {
  roomId: string;
  matchState: MatchStateType;
  room: ChatRoom;
}

export const Chat: FC<Props> = ({ roomId, matchState, room }) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const { push } = useRouter();
  const isChat = matchState === "chat";
  const isResults = matchState === "results";
  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);
  const { mutate: send } = api.chat.sendMessage.useMutation();

  const appendMessage = (newMessage: ChatMessagePayload) => {
    setMessages((prev) => [newMessage, ...prev]);
  };

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
    },
  );

  // Group messages by sender
  const groupedMessages: GroupedMessage[] = messages.reduce((acc, message) => {
    const lastGroup = acc[0];
    const isLocalSender = message.sender === session?.user.id;

    if (!lastGroup || lastGroup.isLocalSender !== isLocalSender) {
      acc.unshift({ isLocalSender, messages: [message.message] });
    } else {
      const groupMessages = lastGroup.messages ?? [];
      groupMessages.unshift(message.message);
      lastGroup.messages = groupMessages;
    }

    return acc;
  }, [] as GroupedMessage[]);

  const handleSend = (value: string) => {
    if (message) {
      send({ message: value, sentAt: Date.now(), roomId });
      setMessage("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const isEnter = event.code === "Enter" || event.code === "NumpadEnter";

    if (isEnter) {
      event.preventDefault();
      handleSend(message);
    }
  };

  if (isResults) return null;

  return (
    <Stack component="section" sx={styles.section(isChat)}>
      <Messages messages={groupedMessages} />
      <Timer time={room.createdAt} duration={CHAT_TIME_MS} />
      <InputField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onClick={() => handleSend(message)}
        disabled={!isChat}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </Stack>
  );
};
