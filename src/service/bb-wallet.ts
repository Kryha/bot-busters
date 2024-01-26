/* eslint-disable @typescript-eslint/unbound-method */
import {
  type LeoWalletAdapter,
  LeoWalletName,
} from "@demox-labs/aleo-wallet-adapter-leo";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import {
  DecryptPermission,
  type WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { useCallback, useEffect, useState } from "react";

import { AUTH_SIGN_MESSAGE } from "~/constants/index.js";
import { env } from "~/env.mjs";

export const useBBWallet = () => {
  const {
    publicKey: address,
    wallet,
    connected,
    connecting,
    connect,
    disconnect,
    disconnecting,
    select,
  } = useWallet();

  useEffect(() => {
    select(LeoWalletName);
  }, [select]);

  const [isSigning, setIsSigning] = useState(false);

  const getSignature = useCallback(async () => {
    setIsSigning(true);
    try {
      if (!wallet) throw new Error("Wallet not initialised.");

      const adapter = wallet.adapter as LeoWalletAdapter;

      const bytes = new TextEncoder().encode(AUTH_SIGN_MESSAGE);
      const signatureMessageBytes = await adapter.signMessage(bytes);
      const newSignature = new TextDecoder().decode(signatureMessageBytes);

      return newSignature;
    } catch (error) {
      console.error(error);
    }
    setIsSigning(false);
  }, [wallet]);

  const connectWallet = useCallback(async () => {
    if (connected || connecting) return;
    try {
      await connect(
        DecryptPermission.UponRequest,
        // leave the following as an env variable
        env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork,
      );
    } catch (error) {
      console.error(error);
    }
  }, [connect, connected, connecting]);

  const disconnectWallet = useCallback(async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error(error);
    }
  }, [disconnect]);

  return {
    address: address ?? undefined,
    wallet: wallet ?? undefined,
    isConnected: connected,
    isConnecting: connecting,
    isDisconnecting: disconnecting,
    isSigning,
    connect: connectWallet,
    disconnect: disconnectWallet,
    getSignature,
  };
};
