import { useEffect, type FC } from "react";

import { ChatPage } from "@/layouts";
import { useRouter } from "next/router";
import { z } from "zod";
import { ChatView } from "@/features";
import dynamic from "next/dynamic";
import { pages } from "@/utils/router";

const Chat: FC = () => {
  const router = useRouter();

  const roomId = z.string().safeParse(router.query.roomId);

  useEffect(() => {
    if (!roomId.success) {
      void router.push(pages.home);
    }
  }, [roomId.success, router]);

  if (!roomId.success) return <></>;

  return (
    <ChatPage>
      <ChatView roomId={roomId.data} />
    </ChatPage>
  );
};

export default dynamic(() => Promise.resolve(Chat), {
  ssr: false,
});
