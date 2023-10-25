import { useState, type FC } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Stack } from "@mui/material";

import { Page } from "@/layouts";
import { api } from "@/utils/api";
import { pages } from "@/utils/router";
import { text } from "@/assets/text";

const Lobby: FC = () => {
  const router = useRouter();

  const [queueLength, setQueueLength] = useState(0);
  const [myPlaceInQueue, setMyPlaceInQueue] = useState(0);

  const join = api.lobby.join.useMutation();

  api.lobby.onQueueUpdate.useSubscription(undefined, {
    onStarted() {
      join.mutate();
    },
    onData(payload) {
      setQueueLength(payload.queueLength);
      setMyPlaceInQueue(payload.myPlaceInQueue);
    },
    onError(error) {
      console.error("Queue update error:", error);
    },
  });

  api.lobby.onReadyToPlay.useSubscription(undefined, {
    onData({ roomId }) {
      void router.push({ pathname: pages.chat, query: { roomId } });
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
