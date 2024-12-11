import { type FC, useEffect, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useBBWallet } from "~/service/bb-wallet.js";
import { type LoggedUserData } from "~/types/index.js";
import { errorMessage } from "~/constants/error-messages.js";

import { LoginLoading } from "./login-loading.jsx";
import { type LoginStage } from "./types.js";
import { WalletConnectButton } from "@demox-labs/aleo-wallet-adapter-reactui";

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
  const { showBoundary } = useErrorBoundary();
  const { connect, isConnecting, isSigning, getSignature, address } =
    useBBWallet();

  const isAuthenticating = useRef(false);

  const authenticate = async () => {
    if (isConnecting || isSigning || isAuthenticating.current) return;

    isAuthenticating.current = true;

    try {
      if (!address) {
        await connect();
      } else {
        const signature = await getSignature();

        setAddress(address);

        if (signature) {
          setSignature(signature);
        } else {
          showBoundary(errorMessage.walletConnection);
        }
        setLoginStage(loggedUser ? "verify" : "signIn");
      }
    } catch (e) {
      e instanceof Error
        ? console.error(`[${errorMessage.walletConnection}]: ${e.message}`, e)
        : console.error(e);

      showBoundary(errorMessage.walletConnection);
    }
    isAuthenticating.current = false;
  };

  // useEffect(() => {
  //   const authenticate = async () => {
  //     if (isConnecting || isSigning || isAuthenticating.current) return;

  //     isAuthenticating.current = true;

  //     try {
  //       if (!address) {
  //         await connect();
  //       } else {
  //         const signature = await getSignature();

  //         setAddress(address);

  //         if (signature) {
  //           setSignature(signature);
  //         } else {
  //           showBoundary(errorMessage.walletConnection);
  //         }
  //         setLoginStage(loggedUser ? "verify" : "signIn");
  //       }
  //     } catch (e) {
  //       e instanceof Error
  //         ? console.error(`[${errorMessage.walletConnection}]: ${e.message}`, e)
  //         : console.error(e);

  //       showBoundary(errorMessage.walletConnection);
  //     }
  //     isAuthenticating.current = false;
  //   };

  //   void authenticate();
  // }, [
  //   address,
  //   connect,
  //   getSignature,
  //   isConnecting,
  //   isSigning,
  //   loggedUser,
  //   setAddress,
  //   setLoginStage,
  //   setSignature,
  //   showBoundary,
  // ]);

  if (isAuthenticating) return <LoginLoading />;

  return <WalletConnectButton onClick={() => void authenticate()} />;

  // return <LoginLoading />;
};
