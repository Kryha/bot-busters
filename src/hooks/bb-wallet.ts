/* eslint-disable @typescript-eslint/unbound-method */
import { type LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import {
  DecryptPermission,
  type WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { useCallback, useState } from "react";

import { AUTH_SIGN_MESSAGE } from "@/constants";
import { env } from "@/env.cjs";
import { isClient } from "@/utils/client";

const ls = isClient() ? localStorage : undefined;

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

  const [signature, setSignature] = useState(
    ls?.getItem("signature") ?? undefined
  );

  const getSignature = useCallback(async () => {
    if (!wallet) return;

    if (signature) return signature;

    try {
      const adapter = wallet.adapter as LeoWalletAdapter;

      const bytes = new TextEncoder().encode(AUTH_SIGN_MESSAGE);
      const signatureMessageBytes = await adapter.signMessage(bytes);
      const signature = new TextDecoder().decode(signatureMessageBytes);

      // Storing the signature helps preventing a constant request for signing a message
      ls?.setItem("signature", signature);
      setSignature(signature);
    } catch (error) {
      console.error(error);
    }
  }, [signature, wallet]);

  const connectWallet = useCallback(async () => {
    if (connected || connecting) return;
    try {
      await connect(
        DecryptPermission.UponRequest,
        // leave the following as an env variable
        env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork
      );
    } catch (error) {
      console.error(error);
    }
  }, [connect, connected, connecting]);

  const disconnectWallet = useCallback(async () => {
    try {
      ls?.removeItem("signature");
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
    connect: connectWallet,
    disconnect: disconnectWallet,
    getSignature,
    select,
  };
};
