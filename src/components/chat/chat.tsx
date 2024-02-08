import { Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router.js";
import { useMemo, useState, type FC, type KeyboardEvent } from "react";

import {
  type CharacterId,
  type ChatMessagePayload,
  type MatchRoom,
  type MessageData,
} from "~/types/index.js";

import { HostChatPrompt } from "~/components/host-chat-prompt/index.js";
import { InputField } from "~/components/input-field/index.js";
import { Messages } from "~/components/messages/index.js";
import { Timer } from "~/components/timer/index.js";
import {
  CHARACTERS,
  CHAT_TIME_MS,
  MAX_CHARACTERS_CHAT_MESSAGE,
  validMessageSchema,
  validation,
} from "~/constants/index.js";
import { pages } from "~/router.js";
import { api } from "~/utils/api.js";

import { styles } from "./styles.js";

interface Props {
  roomId: string;
  room: MatchRoom;
}

export const Chat: FC<Props> = ({ roomId, room }) => {
  const { data: session } = useSession();
  const { players, stage } = room;
  const { push } = useRouter();
  const { textLength } = validation;

  const sendMessage = api.match.sendMessage.useMutation();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessagePayload[]>(room.messages);
  const [messageError, setValidation] = useState("");

  const appendMessage = (newMessage: ChatMessagePayload) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleMessageChange = (event: { target: { value: string } }) => {
    const inputValue = event.target.value;

    validateForm(inputValue);

    if (!messageError && inputValue.length <= MAX_CHARACTERS_CHAT_MESSAGE) {
      setMessage(inputValue);
    } else if (inputValue.length > MAX_CHARACTERS_CHAT_MESSAGE) {
      setMessage(inputValue.slice(0, MAX_CHARACTERS_CHAT_MESSAGE));
    }
  };

  const validateForm = (newMessage: string) => {
    const error = validMessageSchema.safeParse(newMessage).success
      ? ""
      : textLength.chatMessage.error;
    setValidation(error);
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
    return messages.findLast((message) => message.sender === "host");
  }, [messages]);

  const messageData: MessageData[] = useMemo(() => {
    return messages
      .filter((message) => {
        return message.sender !== "host";
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
    <Stack sx={styles.container(stage)}>
      <Stack component="section" sx={styles.section}>
        <HostChatPrompt stage={stage} message={hostMessageData?.message} />
        <Messages messageData={messageData} />
      </Stack>

      <Timer time={room.createdAt} duration={CHAT_TIME_MS} />

      {!isChatDisabled && (
        <InputField
          value={message}
          onChange={handleMessageChange}
          onClick={() => handleSend(message)}
          disabled={isChatDisabled}
          validationError={messageError}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      )}
    </Stack>
  );
};
