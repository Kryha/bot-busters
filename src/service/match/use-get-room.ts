import { useRouter } from "next/router";
import { z } from "zod";

import { api } from "@/utils/api";
import { type ChatRoom } from "@/server/api/match-types";

export const useGetRoom = (): ChatRoom | undefined => {
  const { query } = useRouter();
  const roomId = z.string().safeParse(query.roomId);

  // TODO: figure out how to handle errors
  if (!roomId.success) return;

  const getRoom = api.chat.getRoom.useQuery({ roomId: roomId.data });

  if (getRoom.error) return;

  return getRoom.data;
};
