import dynamic from "next/dynamic";
import { useEffect, type FC } from "react";
import { useRouter } from "next/router";
import { z } from "zod";

import {
  MatchLayout as Layout,
  MatchOverviewLayout as OverviewLayout,
} from "../../layouts/index.js";
import { Chat } from "../../features/chat/index.js";
import { Players } from "../../features/players/index.js";
import { Score } from "../../features/score/index.js";
import { Results } from "../../features/score/components/index.js";
import { useMatchState } from "../../service/index.js";
import { pages } from "../../utils/router.js";
import { api } from "../../utils/api.js";

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
