import { useRouter } from "next/router";
import { z } from "zod";

import { api } from "~/utils/api.js";

export const useRoom = () => {
  const { query } = useRouter();
  const roomId = z.string().safeParse(query.roomId);

  // TODO: figure out how to handle errors
  if (!roomId.success) return;

  return api.chat.getRoom.useQuery({ roomId: roomId.data });
};
