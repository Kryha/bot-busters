import { type FC, type KeyboardEvent, useState } from "react";
import { Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import {
  type ChatMessagePayload,
  type MatchRoom,
} from "~/server/api/match-types.js";
import { api } from "~/utils/api.js";
import { CHARACTERS, CHAT_TIME_MS } from "~/constants/index.js";
import { pages } from "~/router.js";
import { type ChatMessage } from "~/types/index.js";
import { Messages } from "~/components/messages/index.js";
import { InputField } from "~/components/input-field/index.js";
import { Timer } from "~/components/timer/index.js";

import { styles } from "./styles.js";
import { text } from "~/assets/text";

interface Props {
  roomId: string;
  room: MatchRoom;
}

export const Chat: FC<Props> = ({ roomId, room }) => {
  const { data: session } = useSession();
  const { push } = useRouter();

  const sendMessage = api.match.sendMessage.useMutation();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);
  const players = room.players;

  const appendMessage = (newMessage: ChatMessagePayload) => {
    setMessages((prev) => [newMessage, ...prev]);
  };

  api.match.onMessage.useSubscription(
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

  const chatMessages: ChatMessage[] = messages.map((message) => {
    const isLocalSender = message.sender === session?.user.id;
    // Find the player associated with the message sender
    const player = players.find((player) => player.userId === message.sender);

    // Find the character associated with the player
    const character = CHARACTERS.find(
      (character) => character.id === player?.characterId,
    );

    // Extract username and color from the character
    const username = character?.characterName ?? text.general.username;
    const color = character?.color ?? "#2196F3";

    return {
      isLocalSender,
      ...message,
      username,
      color,
    };
  });

  const handleSend = (value: string) => {
    if (message) {
      sendMessage.mutate({ message: value, sentAt: Date.now(), roomId });
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

  const isDisabled = room.stage !== "chat";

  return (
    <Stack component="section" sx={styles.section(isDisabled)}>
      <Messages messages={chatMessages} />
      <Timer time={room.createdAt} duration={CHAT_TIME_MS} />
      <InputField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onClick={() => handleSend(message)}
        disabled={isDisabled}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </Stack>
  );
};
