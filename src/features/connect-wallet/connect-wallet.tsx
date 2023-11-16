import { type FC } from "react";

import { UsernameSelect, ConnectPlaceholder } from "./components";
import { useSession } from "next-auth/react";
import { isUnverifiedSession } from "@/utils/session";

export const ConnectWallet: FC = () => {
  const { data: sessionData } = useSession();

  if (isUnverifiedSession(sessionData)) return <UsernameSelect />;

  return <ConnectPlaceholder />;
};
