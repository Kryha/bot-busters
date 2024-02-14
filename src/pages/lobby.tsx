import { type FC, useState } from "react";
import { type TrackId } from "~/constants/sounds.js";
import { useRouter } from "next/router.js";
import { usePlayMusic } from "~/hooks/sounds.js";

import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { LobbyCharacterLoader } from "~/components/lobby-character-loader/index.js";

const Lobby: FC = () => {
  const { push } = useRouter();
  const join = api.lobby.join.useMutation();
  const [playerQueuePosition, setPlayerQueuePosition] = useState(0);
  const [queueLength, setQueueLength] = useState(0);
  const [track, setTrack] = useState<TrackId>("MatchMaking");

  api.lobby.onQueueUpdate.useSubscription(undefined, {
    async onStarted() {
      try {
        await join.mutateAsync();
      } catch (error) {
        await push(pages.home);
      }
    },
    onData({ playerQueuePosition, queueLength }) {
      setPlayerQueuePosition(playerQueuePosition);
      setQueueLength(queueLength);
    },
    onError(error) {
      console.error("Queue update error:", error);
    },
  });

  api.lobby.onReadyToPlay.useSubscription(undefined, {
    onData({ roomId }) {
      setTrack("MatchMakingOutro");
      setTimeout(() => {
        void push({ pathname: pages.match, query: { roomId } });
      }, 2000);
    },
    onError(error) {
      console.error("Ready to play error:", error);
    },
  });

  usePlayMusic(
    track,
    track !== "MatchMakingOutro",
    pages.lobby,
    track === "MatchMakingOutro" ? 0 : 1,
  );

  return (
    <LobbyCharacterLoader
      playerQueuePosition={playerQueuePosition}
      queueLength={queueLength}
    />
  );
};

export default Lobby;
