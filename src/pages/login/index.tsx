/* eslint-disable @typescript-eslint/unbound-method */
import { useEffect, type FC } from "react";
import {
  LeoWalletName,
  type LeoWalletAdapter,
} from "@demox-labs/aleo-wallet-adapter-leo";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import {
  DecryptPermission,
  type WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { env } from "@/env.cjs";
import { signIn, useSession } from "next-auth/react";

import { AUTH_SIGN_MESSAGE } from "@/constants";
import { Page } from "@/layouts";
import { ConnectWallet } from "@/features/connect-wallet";
import {
  isAnonymousSession,
  isValidSession,
  isVerifiedSession,
} from "@/utils/session";
import { is } from "drizzle-orm";

const Login: FC = () => {
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
      if (connecting || !wallet || !address || isVerifiedSession(sessionData)) {
        return;
      }
      try {
        const adapter = wallet.adapter as LeoWalletAdapter;

        const bytes = new TextEncoder().encode(AUTH_SIGN_MESSAGE);
        const signatureMessageBytes = await adapter.signMessage(bytes);
        const signedMessage = new TextDecoder().decode(signatureMessageBytes);

        //TODO: Decide on usage of sessionStorage or localStorage
        sessionStorage.setItem(
          "signedMessage",
          JSON.stringify({ signedMessage, address })
        );
      } catch (error) {
        //TODO: handle unauthorized error
        console.error(error);
      }
    };
    void connectWallet();
  }, [wallet, address, connecting, sessionData, connected]);

  const authenticatePlayer = async () => {
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

  useEffect(() => {
    void authenticatePlayer();
  });

  return (
    <Page>
      <ConnectWallet />
    </Page>
  );
};

export default Login;
