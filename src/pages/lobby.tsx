import { type FC, useState } from "react";
import { useRouter } from "next/router.js";

import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { LobbyCharacterLoader } from "~/components/lobby-character-loader/index.js";

const Lobby: FC = () => {
  const { push } = useRouter();
  const join = api.lobby.join.useMutation();
  const [lobbyQueue, setLobbyQueue] = useState({
    playerQueuePosition: 0,
    queueLength: 0,
  });

  api.lobby.onQueueUpdate.useSubscription(undefined, {
    async onStarted() {
      try {
        await join.mutateAsync();
      } catch (error) {
        await push(pages.home);
      }
    },
    onData({ playerQueuePosition, queueLength }) {
      setLobbyQueue({ playerQueuePosition, queueLength });
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
    <LobbyCharacterLoader
      playerQueuePosition={lobbyQueue.playerQueuePosition}
      queueLength={lobbyQueue.queueLength}
    />
  );
};

export default Lobby;
