import { useEffect, type FC } from "react";

import { UsernameSelect, ConnectPlaceholder } from "./components";
import { signIn, useSession } from "next-auth/react";
import {
  isAnonymousSession,
  isUnverifiedSession,
  isValidSession,
  isVerifiedSession,
} from "@/utils/session";
import router from "next/router";
import { pages } from "@/utils/router";
import { api } from "@/utils/api";

export const ConnectWallet: FC = () => {
  const { data: sessionData } = useSession();

  const { mutate, isSuccess } = api.user.mergeScore.useMutation();

  useEffect(() => {
    const signedMessage = sessionStorage.getItem("signedMessage");
    const aleoAddress = sessionStorage.getItem("aleoAddress");

    console.log("session data", sessionData);

    if (aleoAddress == null || signedMessage == null) return;
    if (isUnverifiedSession(sessionData) || isVerifiedSession(sessionData))
      return;

    const login = async () => {
      const loginCredentials = {
        address: aleoAddress,
        signature: signedMessage,
      };
      //TODO:FIX rerender and creating new users
      if (!isValidSession(sessionData)) {
        console.log("Is signing in ");
        console.log("login credentials", loginCredentials);
        console.log("Session data", sessionData);
        // await signIn("credentials", loginCredentials);
      }
      if (isAnonymousSession(sessionData)) {
        console.log("is merging account");
        mutate(loginCredentials);
        if (isSuccess) await signIn("credentials", loginCredentials);
      }
    };
    void login();
  }, [isSuccess, mutate]);
  // TODO: add check if the user already has a username & id

  if (isUnverifiedSession(sessionData)) return <UsernameSelect />;
  if (isVerifiedSession(sessionData)) void router.push(pages.home);
  return <ConnectPlaceholder />;
};
