/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, type FC, useEffect, type KeyboardEvent } from "react";
import { Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import {
  type ChatRoom,
  type ChatMessagePayload,
} from "@/server/api/match-types";
import { api } from "@/utils/api";
import { styles } from "./styles";
import { InputField, Messages, Timer } from "./components";
import { type MatchStateType } from "@/types";
import { CHAT_TIME_MS } from "@/constants";
import { useMessages } from "./service";

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

  const setCreatedAt = useStore((state) => state.setCreatedAt);
  const { data: room } = api.chat.getRoom.useQuery({ roomId });
  const isChat = matchState === "chat";
  const messages = useMessages({ roomId });
  const { mutate: send } = api.chat.sendMessage.useMutation();

  const handleSend = (value: string) => {
    if (message) {
      send({ message: value, sentAt: Date.now(), roomId });
      setMessage("");
    }
  };

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
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const isEnter = event.code === "Enter" || event.code === "NumpadEnter";

    if (isEnter) {
      event.preventDefault();
      handleSend(message);
    }
  };

  useEffect(() => {
    if (room) {
      setCreatedAt(room.createdAt);
    }
  }, [room, setCreatedAt]);

  return (
    <Stack component="section" sx={styles.section(isChat)}>
      <Messages messages={messages} />
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
