import dynamic from "next/dynamic";
import { type FC, useEffect } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { MatchLayout as Layout } from "~/components/match-layout";
import { MatchOverviewLayout as OverviewLayout } from "~/components/match-overview-layout";
import { Players } from "src/components/players";
import { Score } from "~/components/score";
import { useMatchState } from "~/service";
import { pages } from "~/router";
import { api } from "~/utils/api";
import { Chat } from "~/containers/chat/chat";
import { Results } from "~/containers/results";

const Match: FC = () => {
  const matchState = useMatchState();
  const { query, push } = useRouter();
  const roomId = z.string().safeParse(query.roomId);

  useEffect(() => {
    if (!roomId.success) {
      void push(pages.home);
    }
  }, [roomId.success, push]);

  if (!roomId.success || !matchState) return;

  const { data: room } = api.chat.getRoom.useQuery({
    roomId: roomId.data,
  });

  return (
    <Layout>
      <OverviewLayout>
        {room && <Players matchState={matchState} room={room} />}
        <Score matchState={matchState} />
      </OverviewLayout>
      <Results matchState={matchState} />
      {room && (
        <Chat roomId={roomId.data} matchState={matchState} room={room} />
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Match), {
  ssr: false,
});
