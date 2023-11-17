import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, type FC } from "react";
import {
  MatchLayout as Layout,
  MatchOverviewLayout as OverviewLayout,
} from "@/layouts";
import { z } from "zod";
import { Chat } from "@/features/chat";
import { Players } from "@/features/players";
import { Score } from "@/features/score";
import { pages } from "@/utils/router";
import { Results } from "@/features/score/components";
import { useMatchState } from "@/service";
import { useRoom } from "@/service/match";

const Match: FC = () => {
  const matchState = useMatchState();
  const roomData = useRoom();

  const isResults = matchState === "results";

  // TODO: Clean up the error routing handler into a hook
  const { query, push } = useRouter();
  const roomId = z.string().safeParse(query.roomId);

  useEffect(() => {
    if (!roomId.success) {
      void push(pages.home);
    }
  }, [roomId.success, push]);

  if (!roomId.success || !matchState) return;
  if (!roomData?.error || !roomData.data) return;

  const room = roomData.data;

  return (
    <Layout>
      <OverviewLayout>
        <Players matchState={matchState} room={room} />
        <Score matchState={matchState} />
      </OverviewLayout>
      {isResults ? (
        <Results />
      ) : (
        <Chat roomId={roomId.data} matchState={matchState} room={room} />
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Match), {
  ssr: false,
});
