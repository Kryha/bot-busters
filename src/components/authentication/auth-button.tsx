/* eslint-disable @typescript-eslint/unbound-method */
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import {
  DecryptPermission,
  type WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { LeoWalletName } from "@demox-labs/aleo-wallet-adapter-leo";
import { Button } from "@mui/material";
import { isValidSession } from "@/utils/session";
import { text } from "@/assets/text";
import { env } from "@/env.mjs";

export const AuthButton = () => {
  const { data: sessionData, status } = useSession();

  const {
    publicKey,
    connect,
    connected: walletConnected,
    select,
    disconnect,
  } = useWallet();

  useEffect(() => {
    select(LeoWalletName);
  }, [select]);

  useEffect(() => {
    const authenticate = async () => {
      if (!walletConnected || !publicKey || status === "authenticated") return;
      try {
        await signIn("credentials", { publicKey });
      } catch (error) {
        console.error(error);
      }
    };
    void authenticate();
  }, [publicKey, status, walletConnected]);

  const handleSignIn = async () => {
    try {
      await connect(
        DecryptPermission.UponRequest,
        env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await disconnect();
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={
        isValidSession(sessionData)
          ? () => void handleSignOut()
          : () => void handleSignIn()
      }
    >
      {isValidSession(sessionData) ? text.auth.signOut : text.auth.signIn}
    </Button>
  );
};
