import { useState, type FC } from "react";
import { useRouter } from "next/router";
import { Typography, CircularProgress } from "@mui/material";

import { LobbyLayout as Layout } from "@/layouts";
import { api } from "@/utils/api";
import { pages } from "@/utils/router";
import { text } from "@/assets/text";
import { LOBBY_SPLASH_SCREEN_DURATION } from "@/constants";

const Lobby: FC = () => {
  const { push } = useRouter();
  const join = api.lobby.join.useMutation();
  const [showSplashScreen, setShowSplashScreen] = useState(false);

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
      setShowSplashScreen(true);
      setTimeout(() => {
        setShowSplashScreen(false);
        return void push({ pathname: pages.match, query: { roomId } });
      }, LOBBY_SPLASH_SCREEN_DURATION);
    },
    onError(error) {
      console.error("Ready to play error:", error);
    },
  });

  return (
    <Layout>
      {showSplashScreen ? (
        <Typography variant="h1">{text.lobby.start}</Typography>
      ) : (
        <>
          <Typography variant="h5">{text.lobby.waiting}</Typography>
          <CircularProgress />
        </>
      )}
    </Layout>
  );
};

export default Lobby;
