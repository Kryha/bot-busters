import { type FC, type KeyboardEvent, useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router.js";

import {
  type CharacterId,
  type ChatMessagePayload,
  type MatchRoom,
} from "~/types/index.js";
import { CHARACTERS, CHAT_TIME_MS, MATCH_HOST } from "~/constants/index.js";
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
    setMessages((prev) => [...prev, newMessage]);
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

  const hostMessageData: ChatMessagePayload | undefined = useMemo(() => {
    const hostMessage = messages.findLast(
      (message) => message.sender === MATCH_HOST,
    );
    return hostMessage;
  }, [messages]);

  const messageData: MessageData[] = useMemo(() => {
    return messages
      .filter((message) => {
        return message.sender !== MATCH_HOST;
      })
      .map((message) => {
        const isLocalSender = message.sender === session?.user?.id;
        const characterId: CharacterId = players.find(
          (player) => player.userId === message.sender,
        )!.characterId;

        return {
          message: { ...message, isLocalSender },
          character: CHARACTERS[characterId],
        };
      })
      .toReversed();
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

  const isChatDisabled = stage !== "chat";

  return (
    <Stack component="section" sx={styles.section(isChatDisabled)}>
      <Messages messageData={messageData} hostMessage={hostMessageData} />
      <Timer time={room.createdAt} duration={CHAT_TIME_MS} />
      <InputField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onClick={() => handleSend(message)}
        disabled={isChatDisabled}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </Stack>
  );
};
