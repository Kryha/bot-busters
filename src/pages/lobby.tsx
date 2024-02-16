import { type FC, useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import { useErrorBoundary } from "react-error-boundary";
import { usePlayMusic } from "~/hooks/sounds.js";
import { type TrackId } from "~/constants/sounds.js";
import { HomePageOutroAnimation } from "~/components/homepage-outro/index.js";
import { LobbyCharacterLoader } from "~/components/lobby-character-loader/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { errorMessage } from "~/constants/error-messages.js";
import { MATCHMAKING_DELAY_MS } from "~/constants/index.js";

const Lobby: FC = () => {
  const { showBoundary } = useErrorBoundary();
  const { push } = useRouter();
  const join = api.lobby.join.useMutation();
  const [lobbyQueue, setLobbyQueue] = useState({
    playerQueuePosition: 0,
    queueLength: 0,
  });

  const [track, setTrack] = useState<TrackId>("MatchMaking");
  const [matchReady, setMatchReady] = useState(false);
  const [slideAnimation, setSlideAnimation] = useState(false);

  const delayInSeconds = track === "MatchMakingOutro" ? 0 : 1;

  usePlayMusic(
    track,
    track !== "MatchMakingOutro",
    pages.lobby,
    delayInSeconds,
  );

  api.lobby.onQueueUpdate.useSubscription(undefined, {
    async onStarted() {
      try {
        await join.mutateAsync();
      } catch (e) {
        e instanceof Error
          ? console.error(`[${errorMessage.match.general}]: ${e.message}`, e)
          : console.error(e);

        showBoundary(errorMessage.match.general);
      }
    },
    onData({ playerQueuePosition, queueLength }) {
      setLobbyQueue({ playerQueuePosition, queueLength });
    },
    onError(e) {
      e instanceof Error
        ? console.error(`[${errorMessage.match.general}]: ${e.message}`, e)
        : console.error(e);

      showBoundary(errorMessage.match.general);
    },
  });

  api.lobby.onReadyToPlay.useSubscription(undefined, {
    onData({ roomId }) {
      setTrack("MatchMakingOutro");
      setMatchReady(true);
      setTimeout(() => {
        void push({ pathname: pages.match, query: { roomId } });
      }, MATCHMAKING_DELAY_MS);
    },
    onError(e) {
      e instanceof Error
        ? console.error(`[${errorMessage.match.general}]: ${e.message}`, e)
        : console.error(e);

      showBoundary(errorMessage.match.general);
    },
  });

  useEffect(() => {
    setSlideAnimation(true);
    setTimeout(() => {
      setSlideAnimation(false);
    }, 1000);
  }, []);

  return (
    <>
      {slideAnimation ? (
        <HomePageOutroAnimation slideAnimation={slideAnimation} />
      ) : (
        <LobbyCharacterLoader
          playerQueuePosition={lobbyQueue.playerQueuePosition}
          queueLength={lobbyQueue.queueLength}
          matchReady={matchReady}
        />
      )}
    </>
  );
};

export default Lobby;
