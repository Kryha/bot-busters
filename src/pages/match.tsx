import { type FC, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router.js";
import { useSession } from "next-auth/react";
import { type Session } from "next-auth";
import { z } from "zod";
import { useErrorBoundary } from "react-error-boundary";

import { MatchLayout as Layout } from "~/components/match-layout/index.js";
import { api } from "~/utils/api.js";
import { Chat } from "~/components/chat/chat.jsx";
import { Results } from "~/components/results/index.js";
import { PlayerLocal } from "~/components/players/player-local/index.js";
import { PlayersOthers } from "~/components/players/player-others/index.js";
import { errorMessage } from "~/constants/error-messages.js";
import { LoadingPage } from "~/components/loading-page/index.js";
import { pages } from "~/router.js";

const Match: FC = () => {
  const { showBoundary } = useErrorBoundary();
  const { query } = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const roomId = z.string().safeParse(query.roomId);

  if (sessionStatus === "loading") return <LoadingPage />;

  if (!roomId.success || !session) {
    showBoundary(errorMessage.match.lostConnection);
    return;
  }

  return <MatchInternal roomId={roomId.data} session={session} />;
};

interface Props {
  roomId: string;
  session: Session;
}

const MatchInternal: FC<Props> = ({ roomId, session }) => {
  const { showBoundary } = useErrorBoundary();
  const vote = api.match.vote.useMutation();
  const { events, replace } = useRouter();
  const roomData = api.match.getRoom.useQuery({ roomId });

  // During a match, if the user navigates back to the lobby,
  // they should be redirected back to the match, unless they are at the results stage.
  useEffect(() => {
    if (roomData?.data?.stage === "results") return;
    const handleRouteChange = (url: string) => {
      if (url === pages.lobby && window.history.state) {
        void replace(pages.home);
      }
    };

    events.on("routeChangeStart", handleRouteChange);

    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [events, replace, roomData]);

  api.match.onStageChange.useSubscription(
    { roomId },
    {
      onData() {
        void roomData.refetch();
      },
      enabled: roomData.data && !roomData.data.arePointsCalculated,
    },
  );

  if (roomData.isLoading || !roomData.data) return <LoadingPage />;

  if (roomData.isError) {
    const error = roomData.error?.message ?? errorMessage.match.lostConnection;
    console.error(error);
    showBoundary(error);
    return;
  }

  const room = roomData.data;

  const localPlayer = room.players.find(
    (player) => player.userId === session.user.id,
  );

  if (!localPlayer) {
    showBoundary(errorMessage.match.lostConnection);
    return;
  }

  const isVoteEnabled = !!room.messages.find(
    (message) => message.sender === localPlayer.userId,
  );

  const handleVote = async (selectedUserIds: string[]) => {
    if (!isVoteEnabled) {
      showBoundary(errorMessage.match.votingDisabled);
      return;
    }
    await vote.mutateAsync({ selectedUserIds, roomId });
  };

  const splashVariant = room.stage === "results" ? undefined : room.stage;

  return (
    <Layout splashScreenVariant={splashVariant} localPlayer={localPlayer}>
      <PlayersOthers
        room={room}
        localPlayer={localPlayer}
        isVoteEnabled={isVoteEnabled}
        onVote={handleVote}
      />

      {room.stage === "results" && <Results player={localPlayer} />}
      {room.stage !== "results" && <Chat roomId={roomId} room={room} />}
      {room.stage === "chat" && <PlayerLocal localPlayer={localPlayer} />}
    </Layout>
  );
};

export default dynamic(Promise.resolve(Match), { ssr: false });
