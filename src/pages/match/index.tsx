import { type FC } from "react";
import { useRouter } from "next/router.js";
import { useSession } from "next-auth/react";
import { type Session } from "next-auth";
import { z } from "zod";

import { MatchLayout as Layout } from "~/components/match-layout/index.js";
import { MatchOverviewLayout as OverviewLayout } from "~/components/match-overview-layout/index.js";
import { Players } from "src/components/players/index.js";
import { Score } from "~/components/score/index.js";
import { api } from "~/utils/api.js";
import { Chat } from "~/containers/chat/chat.jsx";
import { Results } from "~/containers/results/index.js";
import { ErrorView } from "~/components/error-view/index.jsx";

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

  const isVoteEnabled = !!room.messages.find(
    (message) => message.sender === localPlayer.userId
  );

  const handleVote = async (selectedUserIds: string[]) => {
    if (!isVoteEnabled) return;
    await vote.mutateAsync({ selectedUserIds, roomId });
  };

  const splashVariant = room.stage === "results" ? undefined : room.stage;

  return (
    <Layout splashScreenVariant={splashVariant}>
      <OverviewLayout matchStage={room.stage}>
        <Players
          room={room}
          localPlayer={localPlayer}
          isVoteEnabled={isVoteEnabled}
          onVote={handleVote}
        />

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
