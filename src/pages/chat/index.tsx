import { type FC } from "react";

import { GeneralPage } from "@/layouts";
import withAuth from "@/utils/withAuth";
import { ChatView } from "@/features";

const Chat: FC = () => {
  return (
    <GeneralPage>
      <ChatView />
    </GeneralPage>
  );
};

export default withAuth(Chat);
