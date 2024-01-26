import { type FC, useEffect } from "react";

import { useBBWallet } from "~/service/bb-wallet.js";
import { type LoggedUserData } from "~/types/index.js";

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
  const { connect, isConnecting, getSignature, address } = useBBWallet();

  useEffect(() => {
    if (isConnecting) return;

    const authenticate = async () => {
      if (!address) {
        await connect();
      } else {
        const signature = await getSignature();

        setAddress(address);
        setSignature(signature);

        setLoginStage(loggedUser ? "verify" : "signIn");
      }
    };

    authenticate().catch((err) => console.error(err));
  }, [
    address,
    connect,
    getSignature,
    isConnecting,
    loggedUser,
    setAddress,
    setLoginStage,
    setSignature,
  ]);

  return <LoginLoading />;
};
