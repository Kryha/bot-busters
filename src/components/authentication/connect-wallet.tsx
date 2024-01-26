import { type FC, useEffect, useRef } from "react";
import { useRouter } from "next/router.js";

import { useBBWallet } from "~/service/bb-wallet.js";
import { type LoggedUserData } from "~/types/index.js";
import { pages } from "~/router.js";

import { LoginLoading } from "./login-loading.jsx";
import { type LoginStage } from "./types.js";

interface ConnectWalletProps {
  loggedUser?: LoggedUserData;
  setAddress: (address: string) => void;
  setSignature: (signature: string) => void;
  setLoginStage: (stage: LoginStage) => void;
}

export const ConnectWallet: FC<ConnectWalletProps> = ({
  loggedUser,
  setAddress,
  setSignature,
  setLoginStage,
}) => {
  const router = useRouter();

  const { connect, isConnecting, isSigning, getSignature, address } =
    useBBWallet();

  const isAuthenticating = useRef(false);

  useEffect(() => {
    const authenticate = async () => {
      if (isConnecting || isSigning || isAuthenticating.current) return;

      isAuthenticating.current = true;

      if (!address) {
        await connect();
      } else {
        const signature = await getSignature();

        setAddress(address);

        if (signature) {
          setSignature(signature);
        } else {
          // TODO: redirect to an error page
          await router.push(pages.home);
        }

        setLoginStage(loggedUser ? "verify" : "signIn");
      }

      isAuthenticating.current = false;
    };

    authenticate().catch((err) => console.error(err));
  }, [
    address,
    connect,
    getSignature,
    isConnecting,
    isSigning,
    loggedUser,
    router,
    setAddress,
    setLoginStage,
    setSignature,
  ]);

  return <LoginLoading />;
};
