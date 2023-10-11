/* eslint-disable @typescript-eslint/unbound-method */
import { useEffect } from "react";
import {
  LeoWalletName,
  type LeoWalletAdapter,
} from "@demox-labs/aleo-wallet-adapter-leo";
import { Button } from "@mui/material";
import { isValidSession } from "@/utils/session";
import { text } from "@/assets/text";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { AUTH_SIGN_MESSAGE } from "@/constants";

export const AuthButton = () => {
  const { data: sessionData } = useSession();
  const {
    publicKey: aleoAddress,
    wallet,
    select,
    connect,
    connected,
    connecting,
    disconnect,
  } = useWallet();

  useEffect(() => {
    select(LeoWalletName);
  }, [select]);

  useEffect(() => {
    const connectWallet = async () => {
      if (connecting || !wallet || !aleoAddress || sessionData !== null) {
        return;
      }
      try {
        const adapter = wallet.adapter as LeoWalletAdapter;

        const bytes = new TextEncoder().encode(AUTH_SIGN_MESSAGE);
        const signatureMessageBytes = await adapter.signMessage(bytes);
        const signedMessage = new TextDecoder().decode(signatureMessageBytes);
        await signIn("credentials", {
          aleoAddress,
          signedMessage,
        });
      } catch (error) {
        //TODO: handle unauthorized error
        console.error(error);
      }
    };
    void connectWallet();
  }, [wallet, aleoAddress, connecting, sessionData, connected]);

  const authenticatePlayer = async () => {
    try {
      if (!connected) {
        await connect(
          DecryptPermission.UponRequest,
          WalletAdapterNetwork.Testnet
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await signOut();
    await disconnect();
  };

  return (
    <Button
      onClick={
        isValidSession(sessionData)
          ? () => void logout()
          : () => void authenticatePlayer()
      }
    >
      {isValidSession(sessionData) ? text.auth.signOut : text.auth.signIn}
    </Button>
  );
};
