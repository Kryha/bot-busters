import { type FC } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { type Session } from "next-auth";
import { z } from "zod";

import { MatchLayout as Layout } from "~/components/match-layout";
import { MatchOverviewLayout as OverviewLayout } from "~/components/match-overview-layout";
import { Players } from "src/components/players";
import { Score } from "~/components/score";
import { api } from "~/utils/api";
import { Chat } from "~/containers/chat/chat";
import { Results } from "~/containers/results/index.js";
import { ErrorView } from "~/components/error-view/index.js";

const Match: FC = () => {
  const { query } = useRouter();
  const { data: session } = useSession();
  const roomId = z.string().safeParse(query.roomId);

  if (!roomId.success || !session) return <ErrorView />;

  return <MatchInternal roomId={roomId.data} session={session} />;
};

interface Props {
  roomId: string;
  session: Session;
}

const MatchInternal: FC<Props> = ({ roomId, session }) => {
  const vote = api.match.vote.useMutation();
  const roomData = api.match.getRoom.useQuery({ roomId });

  api.match.onStageChange.useSubscription(
    { roomId },
    {
      onData() {
        void roomData.refetch();
      },
      onError(error) {
        console.error(error);
      },
      enabled: roomData.data && !roomData.data.arePointsCalculated,
    }
  );

  if (roomData.isError) return <ErrorView />;
  if (!roomData.data) return;

  const room = roomData.data;

  const localPlayer = room.players.find(
    (player) => player.userId === session.user.id
  );

  if (!localPlayer) return <ErrorView />;

  const totalBots = room.players.reduce(
    (acc, player) => (player.isBot ? acc + 1 : acc),
    0
  );

  const handleVote = (selectedUserIds: string[]) => {
    // TODO: don't allow calling if user never sent a message
    vote.mutate({ selectedUserIds, roomId });
  };

  const splashVariant = room.stage === "results" ? undefined : room.stage;

  return (
    <Layout splashScreenVariant={splashVariant}>
      <OverviewLayout matchStage={room.stage}>
        <Players room={room} localPlayer={localPlayer} onVote={handleVote} />

        {room.stage === "results" && (
          <Score
            gainedScore={localPlayer.score}
            correctGuesses={localPlayer.correctGuesses}
          />
        )}
      </OverviewLayout>

      {room.stage === "results" && (
        <Results
          gainedScore={localPlayer.score}
          totalBots={totalBots}
          botsBusted={localPlayer.botsBusted}
        />
      )}

      {room && room.stage !== "results" && <Chat roomId={roomId} room={room} />}
    </Layout>
  );
};

export default Match;
