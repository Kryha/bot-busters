import { type FC } from "react";
import { MainChatView, ParticipantsOverview } from "./components";
interface Props {
  roomId: string;
}

export const ChatView: FC<Props> = ({ roomId }) => {
  return (
    <>
      <ParticipantsOverview />
      <MainChatView roomId={roomId} />
    </>
  );
};
