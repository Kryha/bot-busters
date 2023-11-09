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
import { useStore } from "@/store";
import { Results } from "@/features/score/components";

const Match: FC = () => {
  const matchState = useStore((state) => state.matchState);
  const isResults = matchState === "results";

  // TODO: Clean up the error routing handler into a hook
  const { query, push } = useRouter();
  const roomId = z.string().safeParse(query.roomId);

  useEffect(() => {
    if (!roomId.success) {
      void push(pages.home);
    }
  }, [roomId.success, push]);

  if (!roomId.success) return;

  return (
    <Layout>
      <OverviewLayout>
        <Players />
        <Score />
      </OverviewLayout>
      {isResults ? <Results /> : <Chat roomId={roomId.data} />}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Match), {
  ssr: false,
});
