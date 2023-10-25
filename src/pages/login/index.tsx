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
import { v4 as uuid } from "uuid";
import { env } from "@/env.cjs";
import { signIn, useSession } from "next-auth/react";

import { AUTH_SIGN_MESSAGE } from "@/constants";
import { Page } from "@/layouts";
import { ConnectWallet } from "@/features/connect-wallet";
import { isValidSession } from "@/utils/session";

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

  const authenticatePlayer = async () => {
    try {
      if (env.NEXT_PUBLIC_MOCK_AUTH) {
        await signIn("credentials", {
          address: uuid(),
        });
      } else {
        if (!connected) {
          await connect(
            DecryptPermission.UponRequest,
            // leave the following as an env variable
            env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork
          );
        }
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
      <ConnectWallet isAuthenticated={isValidSession(sessionData)} />
    </Page>
  );
};

export default Login;
