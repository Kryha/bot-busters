import { type FC } from "react";
import { useRouter } from "next/router";
import { CircularProgress, Typography } from "@mui/material";

import { LobbyLayout as Layout } from "~/components/lobby-layout/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { text } from "~/assets/text/index.js";

const Lobby: FC = () => {
  const { push } = useRouter();
  const join = api.lobby.join.useMutation();

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
    onData({ roomId }) {
      void push({ pathname: pages.match, query: { roomId } });
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
