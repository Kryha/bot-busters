import { type FC } from "react";

import { UsernameSelect, ConnectPlaceholder } from "./components";
import { useSession } from "next-auth/react";
import { isValidSession } from "@/utils/session";

export const ConnectWallet: FC = () => {
  const { data: sessionData } = useSession();

  if (isValidSession(sessionData)) return <UsernameSelect />;

  return <ConnectPlaceholder />;
};
