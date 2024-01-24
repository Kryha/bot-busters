import { type FC, useState } from "react";
import { useRouter } from "next/router.js";
import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { LobbyCharacterLoader } from "~/components/lobby-character-loader/index.js";

const Lobby: FC = () => {
  const { push } = useRouter();
  const join = api.lobby.join.useMutation();
  const [lobbyQueue, setLobbyQueue] = useState(0);

  // TODO: consider deleting this listener and call join inside a `useEffect`
  api.lobby.onQueueUpdate.useSubscription(undefined, {
    onStarted() {
      join.mutate();
    },
    onData({ queueLength }) {
      setLobbyQueue(queueLength);
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

  return <LobbyCharacterLoader lobbyQueue={lobbyQueue} />;
};

export default Lobby;
