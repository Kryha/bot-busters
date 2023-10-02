/* eslint-disable @typescript-eslint/unbound-method */
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { LeoWalletName } from "@demox-labs/aleo-wallet-adapter-leo";
import { Button } from "@mui/material";
import { isValidSession } from "@/utils/session";
import { text } from "@/assets/text";

export const AuthButton = () => {
  const { data: sessionData, status } = useSession();

  const {
    publicKey,
    connect,
    connected: walletConnected,
    select,
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
        WalletAdapterNetwork.Testnet
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={
        isValidSession(sessionData)
          ? () => void signOut()
          : () => void handleSignIn()
      }
    >
      {isValidSession(sessionData) ? text.auth.signOut : text.auth.signIn}
    </Button>
  );
};
