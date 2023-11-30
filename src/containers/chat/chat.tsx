import { type FC, type KeyboardEvent, useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  type ChatMessagePayload,
  type MatchRoom,
} from "~/server/api/match-types";

import { CHARACTERS, CHAT_TIME_MS } from "~/constants";
import { pages } from "~/router.js";
import { Messages } from "~/components/messages";
import { InputField } from "~/components/input-field";
import { Timer } from "~/components/timer";

import { styles } from "./styles";
import { api } from "~/utils/api";
import { type MessageData } from "~/types";

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
  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);

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

  const messageData: MessageData[] = useMemo(() => {
    return messages.map((message) => {
      const isLocalSender = message.sender === session?.user?.id;
      const characterId = players.find(
        (player) => player.userId === message.sender,
      )!.characterId;

      const character = CHARACTERS[characterId]!;
      return {
        message: {
          isLocalSender,
          ...message,
        },
        character: {
          name: character.name,
          color: character.color,
        },
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
