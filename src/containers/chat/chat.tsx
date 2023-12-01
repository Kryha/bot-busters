import { type FC, type KeyboardEvent, useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import {
  type CharacterId,
  type ChatMessagePayload,
  type MatchRoom,
} from "~/server/api/match-types.js";
import { CHARACTERS, CHAT_TIME_MS } from "~/constants/index.js";
import { pages } from "~/router.js";
import { Messages } from "~/components/messages/index.js";
import { InputField } from "~/components/input-field/index.js";
import { Timer } from "~/components/timer/index.js";
import { api } from "~/utils/api.js";
import { type MessageData } from "~/types/index.js";

import { styles } from "./styles.js";

interface Props {
  roomId: string;
  room: MatchRoom;
}

export const Chat: FC<Props> = ({ roomId, room }) => {
  const { data: session } = useSession();
  const { players, stage } = room;
  const { push } = useRouter();

  const sendMessage = api.match.sendMessage.useMutation();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessagePayload[]>(room.messages);

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
    }
  );

  const messageData: MessageData[] = useMemo(() => {
    return messages.map((message) => {
      const isLocalSender = message.sender === session?.user?.id;
      const characterId: CharacterId = players.find(
        (player) => player.userId === message.sender
      )!.characterId;

      return {
        message: { ...message, isLocalSender },
        character: CHARACTERS[characterId],
      };
    });
  }, [messages, session, players]);

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

  const isDisabled = stage !== "chat";

  return (
    <Stack component="section" sx={styles.section(isDisabled)}>
      <Messages messageData={messageData} />
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
