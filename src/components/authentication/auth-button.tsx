/* eslint-disable @typescript-eslint/unbound-method */

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  LeoWalletName,
  type LeoWalletAdapter,
} from "@demox-labs/aleo-wallet-adapter-leo";
import { Button } from "@mui/material";
import { isValidSession } from "@/utils/session";
import { text } from "@/assets/text";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { signIn, signOut } from "next-auth/react";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

const AUTH_SIGN_MESSAGE = "Sign in to Bot Busters";

export const AuthButton = () => {
  const { data: sessionData, status } = useSession();
  const {
    publicKey,
    wallet,
    select,
    connect,
    connected,
    connecting,
    disconnect,
  } = useWallet();

  const [signature, setSignature] = useState<string>();
  const [walletStatus, setWalletStatus] = useState<
    "connecting" | "checking-signature" | "success" | "error"
  >();
  const isCheckingSign = useRef(false);
  const authTriggered = useRef(false);

  useEffect(() => {
    const connectWallet = async () => {
      if (
        connecting ||
        !wallet ||
        !publicKey ||
        !authTriggered.current ||
        isCheckingSign.current
      )
        return;
      isCheckingSign.current = true;

      try {
        const adapter = wallet.adapter as LeoWalletAdapter;

        let newSignature = signature;
        if (!newSignature) {
          const bytes = new TextEncoder().encode(AUTH_SIGN_MESSAGE);
          const signatureBytes = await adapter.signMessage(bytes);
          newSignature = new TextDecoder().decode(signatureBytes);

          setSignature(newSignature);
        }
        await signIn("credentials", {
          publicKey,
          playerSign: newSignature,
          message: AUTH_SIGN_MESSAGE,
        });
        isCheckingSign.current = false;
        authTriggered.current = false;
      } catch (error) {
        console.error(error);
        setWalletStatus("error");
      } finally {
        setSignature(undefined);
      }
    };
    void connectWallet();
  }, [wallet, publicKey, connecting, signature]);

  const authenticatePlayer = async () => {
    try {
      setWalletStatus("connecting");
      select(LeoWalletName);
      if (!connected) {
        await connect(
          DecryptPermission.UponRequest,
          WalletAdapterNetwork.Testnet
        );
      }
      setWalletStatus("checking-signature");
      authTriggered.current = true;
    } catch (error) {
      console.warn(error);
      setWalletStatus("error");
    }
  };
  const logout = async () => {
    await signOut();
    await disconnect();
  };
  return (
    <>
      <p>
        <a>Wallet status: {walletStatus}</a>
        <br />
        <a>Session status: {status}</a>
      </p>
      <Button
        onClick={
          isValidSession(sessionData)
            ? () => void logout()
            : () => void authenticatePlayer()
        }
      >
        {isValidSession(sessionData) ? text.auth.signOut : text.auth.signIn}
      </Button>
    </>
  );
};
