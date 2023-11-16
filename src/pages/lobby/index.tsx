import { type FC } from "react";
import { useRouter } from "next/router";
import { Typography, CircularProgress } from "@mui/material";

import { LobbyLayout as Layout } from "@/layouts";
import { api } from "@/utils/api";
import { pages } from "@/utils/router";
import { text } from "@/assets/text";
import { useStore } from "@/store";

const Lobby: FC = () => {
  const { push } = useRouter();
  const join = api.lobby.join.useMutation();
  const setCreatedAt = useStore((state) => state.setCreatedAt);

  api.lobby.onQueueUpdate.useSubscription(undefined, {
    onStarted() {
      join.mutate();
    },
    onData(_payload) {
      // TODO: Add data handler
    },
    onError(error) {
      console.error("Queue update error:", error);
    },
  });

  api.lobby.onReadyToPlay.useSubscription(undefined, {
    onData({ roomId, createdAt }) {
      void push({ pathname: pages.match, query: { roomId } });
      setCreatedAt(createdAt);
    },
    onError(error) {
      console.error("Ready to play error:", error);
    },
  });

  return (
    <Layout>
      <Typography variant="h5">{text.lobby.waiting}</Typography>
      <CircularProgress />
    </Layout>
  );
};

export default Lobby;
