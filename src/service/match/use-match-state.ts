import { useState } from "react";
import { useRouter } from "next/router";
import { z } from "zod";

import { type MatchStateType } from "~/types/index.js";
import { api } from "~/utils/api.js";

export const useMatchState = (): MatchStateType | undefined => {
  const [matchState, setMatchState] = useState<MatchStateType>("chat");
  const { query } = useRouter();
  const roomId = z.string().safeParse(query.roomId);

  // TODO: figure out how to handle errors
  if (!roomId.success) return;

  api.chat.onStageChange.useSubscription(
    { roomId: roomId.data },
    {
      onData(payload) {
        setMatchState(payload.stage);
      },
      onError(error) {
        console.error("Error on countdown:", error);
      },
    }
  );

  return matchState;
};
