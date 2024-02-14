import { type FC, useState } from "react";
import { useRouter } from "next/router.js";
import { useErrorBoundary } from "react-error-boundary";

import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { LobbyCharacterLoader } from "~/components/lobby-character-loader/index.js";
import { errorMessage } from "~/constants/error-messages.js";

const Lobby: FC = () => {
  const { showBoundary } = useErrorBoundary();
  const { push } = useRouter();
  const join = api.lobby.join.useMutation();
  const [lobbyQueue, setLobbyQueue] = useState({
    playerQueuePosition: 0,
    queueLength: 0,
  });

  api.lobby.onQueueUpdate.useSubscription(undefined, {
    async onStarted() {
      try {
        console.log("lobby:22");
        await join.mutateAsync();
      } catch (e) {
        e instanceof Error
          ? console.error(`[${errorMessage.match.general}]: ${e.message}`, e)
          : console.error(e);

        console.log("lobby:29");
        showBoundary(errorMessage.match.general);
      }
    },
    onData({ playerQueuePosition, queueLength }) {
      setLobbyQueue({ playerQueuePosition, queueLength });
    },
    onError(e) {
      console.log("lobby:36");

      e instanceof Error
        ? console.error(`[${errorMessage.match.general}]: ${e.message}`, e)
        : console.error(e);

      showBoundary(errorMessage.match.general);
    },
  });

  api.lobby.onReadyToPlay.useSubscription(undefined, {
    onData({ roomId }) {
      void push({ pathname: pages.match, query: { roomId } });
    },
    onError(e) {
      e instanceof Error
        ? console.error(`[${errorMessage.match.general}]: ${e.message}`, e)
        : console.error(e);

      console.log("lobby:56");
      showBoundary(errorMessage.match.general);
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
