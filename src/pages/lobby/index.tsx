import { useState, type FC } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Stack } from "@mui/material";

import { Page } from "@/layouts";
import { api } from "@/utils/api";
import { pages } from "@/utils/router";
import { text } from "@/assets/text";
import { useStore } from "@/store";

const Lobby: FC = () => {
  const router = useRouter();

  const [queueLength, setQueueLength] = useState(0);
  const [myPlaceInQueue, setMyPlaceInQueue] = useState(0);
  const setCreatedAt = useStore((state) => state.setCreatedAt);

  const join = api.lobby.join.useMutation();

  api.lobby.onQueueUpdate.useSubscription(undefined, {
    onStarted() {
      join.mutate();
    },
    onData(payload) {
      setQueueLength(payload.queueLength);
      setMyPlaceInQueue(payload.playerQueuePosition);
    },
    onError(error) {
      console.error("Queue update error:", error);
    },
  });

  api.lobby.onReadyToPlay.useSubscription(undefined, {
    onData({ roomId, createdAt }) {
      localStorage.setItem("createdAt", `${createdAt}`);

      setCreatedAt(createdAt);

      void router.push({ pathname: pages.match, query: { roomId } });
    },
    onError(error) {
      console.error("Ready to play error:", error);
    },
  });

  return (
    <Page>
      <Typography variant="h1">Lobby</Typography>
      <Stack flexDirection="row" mt={2} gap={1}>
        <Button variant="text" onClick={() => void router.push(pages.home)}>
          {text.lobby.leave}
        </Button>

        {/* TODO: maybe don't show queue length */}
        <Typography>{text.lobby.peopleInQueue(queueLength)}</Typography>
        <Typography>{text.lobby.placeInQueue(myPlaceInQueue)}</Typography>
      </Stack>
    </Page>
  );
};

export default Lobby;
