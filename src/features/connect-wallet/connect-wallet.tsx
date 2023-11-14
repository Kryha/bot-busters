import { type FC } from "react";

import { UsernameSelect, ConnectPlaceholder } from "./components";
import { useSession } from "next-auth/react";
import { isUnverifiedSession, isVerifiedSession } from "@/utils/session";
import router from "next/router";
import { pages } from "@/utils/router";

export const ConnectWallet: FC = () => {
  const { data: sessionData } = useSession();

  // TODO: add check if the user already has a username & id

  if (isUnverifiedSession(sessionData)) return <UsernameSelect />;
  if (isVerifiedSession(sessionData)) void router.push(pages.home);
  return <ConnectPlaceholder />;
};
