//TODO: Check if this button component is still being used
/* eslint-disable @typescript-eslint/unbound-method */
import { useEffect } from "react";
import {
  LeoWalletName,
  type LeoWalletAdapter,
} from "@demox-labs/aleo-wallet-adapter-leo";
import { Button } from "@mui/material";
import { text } from "@/assets/text";
import { env } from "@/env.cjs";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { signIn, useSession } from "next-auth/react";
import {
  DecryptPermission,
  type WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { AUTH_SIGN_MESSAGE } from "@/constants";

export const WalletAuthButton = () => {
  const { data: sessionData } = useSession();
  const {
    publicKey: address,
    wallet,
    select,
    connect,
    connected,
    connecting,
  } = useWallet();

  useEffect(() => {
    select(LeoWalletName);
  }, [select]);

  useEffect(() => {
    const connectWallet = async () => {
      if (connecting || !wallet || !address || sessionData !== null) {
        return;
      }
      try {
        const adapter = wallet.adapter as LeoWalletAdapter;

        const bytes = new TextEncoder().encode(AUTH_SIGN_MESSAGE);
        const signatureMessageBytes = await adapter.signMessage(bytes);
        const signedMessage = new TextDecoder().decode(signatureMessageBytes);
        await signIn("credentials", {
          address,
          signedMessage,
        });
      } catch (error) {
        //TODO: handle unauthorized error
        console.error(error);
      }
    };
    void connectWallet();
  }, [wallet, address, connecting, sessionData, connected]);

  const connectWallet = async () => {
    try {
      if (!connected) {
        await connect(
          DecryptPermission.UponRequest,
          // leave the following as an env variable
          env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={() => void connectWallet()}>
      {text.auth.walletSignIn}
    </Button>
  );
};
