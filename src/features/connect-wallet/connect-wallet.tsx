import { useEffect, type FC } from "react";

import { UsernameSelect, ConnectPlaceholder } from "./components";
import { useSession } from "next-auth/react";
import {
  isAnonymousSession,
  isUnverifiedSession,
  isVerifiedSession,
} from "@/utils/session";
import router from "next/router";
import { pages } from "@/utils/router";
import { useMergeUser } from "@/service";
import { useVerifyUser } from "@/service/user/use-verify-user";

interface ConnectWalletProps {
  signedMessage?: string;
  address?: string;
}

export const ConnectWallet: FC<ConnectWalletProps> = ({
  signedMessage,
  address,
}) => {
  const { data: sessionData } = useSession();

  const mergeUsers = useMergeUser(address, signedMessage);
  const verifyUser = useVerifyUser(address, signedMessage);

  useEffect(() => {
    if (isAnonymousSession(sessionData)) {
      if (!address || !signedMessage) return;
      mergeUsers.mutate({ address, signature: signedMessage });
    }
  }, [sessionData]);

  const handleSetUsername = (username: string) => {
    try {
      verifyUser.mutate({ username, address, signature: signedMessage });
    } catch (error) {
      console.log(error);
    }
  };
  // TODO: add check if the user already has a username & id

  if (isUnverifiedSession(sessionData))
    return (
      <UsernameSelect
        handleSetUsername={handleSetUsername}
        // TODO: add error message from the hook
        error="Not working"
      />
    );
  if (isVerifiedSession(sessionData)) void router.push(pages.home);
  return <ConnectPlaceholder />;
};
