/* eslint-disable @typescript-eslint/unbound-method */
import { useEffect, type FC, useState } from "react";
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
import { useSession } from "next-auth/react";

import { AUTH_SIGN_MESSAGE } from "@/constants";
import { Page } from "@/layouts";
import { ConnectWallet } from "@/features/connect-wallet";

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
  const [signedMessage, setSignedMessage] = useState<string>();
  const [aleoAddress, setaleoAddress] = useState<string>();
  useEffect(() => {
    select(LeoWalletName);
  }, [select]);

  useEffect(() => {
    const connectWallet = async () => {
      if (
        connecting ||
        !wallet ||
        !address ||
        sessionStorage.getItem("address") !== null ||
        sessionStorage.getItem("signedMessage") !== null
      ) {
        return;
      }

      try {
        const adapter = wallet.adapter as LeoWalletAdapter;

        const bytes = new TextEncoder().encode(AUTH_SIGN_MESSAGE);
        const signatureMessageBytes = await adapter.signMessage(bytes);
        const signedMessage = new TextDecoder().decode(signatureMessageBytes);

        // Storing the signature helps preventing a constant request for signing a message
        sessionStorage.setItem("signedMessage", signedMessage);
        sessionStorage.setItem("address", address);

        setSignedMessage(signedMessage);
        setaleoAddress(address);
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
      <ConnectWallet signedMessage={signedMessage} address={aleoAddress} />
    </Page>
  );
};

export default Login;
