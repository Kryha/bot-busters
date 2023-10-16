import { type FC } from "react";

import { ChatPage } from "@/layouts";
import withAuth from "@/utils/withAuth";
import { ChatView } from "@/features";

const Chat: FC = () => {
  return (
    <ChatPage>
      <ChatView />
    </ChatPage>
  );
};

export default withAuth(Chat);
