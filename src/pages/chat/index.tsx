import { type FC } from "react";

import { ChatPage } from "@/layouts";
import withAuth from "@/utils/withAuth";
import { ChatView } from "@/features";
import { useRouter } from "next/router";
import { z } from "zod";

const Chat: FC = () => {
  const router = useRouter();

  const roomId = z.string().safeParse(router.query.roomId);

  if (!roomId.success) {
    void router.push("/");
    return <></>;
  }

  return (
    <ChatPage>
      <ChatView roomId={roomId.data} />
    </ChatPage>
  );
};

export default withAuth(Chat);
