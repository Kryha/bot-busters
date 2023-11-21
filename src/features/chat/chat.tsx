/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, type FC, type KeyboardEvent } from "react";
import { Stack } from "@mui/material";
import { type ChatRoom } from "@/server/api/match-types";
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
  const [message, setMessage] = useState("");
  const isChat = matchState === "chat";
  const isResults = matchState === "results";
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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const isEnter = event.code === "Enter" || event.code === "NumpadEnter";

    if (isEnter) {
      event.preventDefault();
      handleSend(message);
    }
  };

  if (isResults) return;

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
