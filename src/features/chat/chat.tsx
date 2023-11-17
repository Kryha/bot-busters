/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, type FC, useEffect, KeyboardEvent } from "react";
import { Stack } from "@mui/material";
import { api } from "@/utils/api";
import { styles } from "./styles";
import { InputField, Messages, Timer } from "./components";
import { type MatchStateType } from "@/types";
import { useStore } from "@/store";
import { useMessages } from "./service";

interface Props {
  roomId: string;
  matchState: MatchStateType;
}

export const Chat: FC<Props> = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const setCreatedAt = useStore((state) => state.setCreatedAt);
  const [matchState, setMatchState] = useState<MatchStateType>("chat");
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

  api.chat.onStageChange.useSubscription(
    { roomId },
    {
      onData(payload) {
        setMatchState(payload.stage);
      },
      onError(error) {
        console.error("Error on countdown:", error);
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

  useEffect(() => {
    if (room) {
      setCreatedAt(room.createdAt);
    }
  }, [room, setCreatedAt]);

  return (
    <Stack component="section" sx={styles.section(isChat)}>
      <Messages messages={messages} />
      <Timer />
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
