import { type FC } from "react";

import { UsernameSelect, ConnectPlaceholder } from "./components";
import { useSession } from "next-auth/react";
import { isUnverifiedSession } from "@/utils/session";

export const ConnectWallet: FC = () => {
  const { data: sessionData } = useSession();

  // TODO: add check if the user already has a username & id

  if (isUnverifiedSession(sessionData)) return <UsernameSelect />;

  return <ConnectPlaceholder />;
};
