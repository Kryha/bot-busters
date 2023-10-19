/* eslint-disable @typescript-eslint/unbound-method */
import { useEffect } from "react";
import {
  LeoWalletName,
  type LeoWalletAdapter,
} from "@demox-labs/aleo-wallet-adapter-leo";
import { Button } from "@mui/material";
import { isValidSession } from "@/utils/session";
import { text } from "@/assets/text";
import { env } from "@/env.cjs";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DecryptPermission,
  type WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { AUTH_SIGN_MESSAGE } from "@/constants";

export const AuthButton = () => {
  const { data: sessionData } = useSession();
  const {
    publicKey: address,
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
        /*
          Private Key  APrivateKey1zkp3aZuKP6xy1Br3sEH7StvdQ5MP67jShHJaJ7TjpgLHRbe
          View Key  AViewKey1u9GpMuSqvEQsw7kiXS8E374pHHpvNyPB6iZhpqa3bQhf
          Address  aleo1uktye0ckresgayj3aayejj87sjr5vzwy49hgqdnrae5edenvkvpseq23e6 

          Private Key  APrivateKey1zkpBfRcDC68LowTszyKdR2y1SDYcSpvytwpbpfsf2aExstt
          View Key  AViewKey1oSaAbRT1qc7RxV2H8avPPkY6JWt1n4TihkcZJWfmwfgc
          Address  aleo1aa2ymf79lnw6l5wtcz5pypzlnyw0q00h4uqn5uwxrmz43nre3ugsnv44ln
        */

        await signIn("credentials", {
          address:
            "aleo1uktye0ckresgayj3aayejj87sjr5vzwy49hgqdnrae5edenvkvpseq23e6",
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

  const logout = async () => {
    await signOut();
    await disconnect();
  };

  return (
    <Button
      variant="outlined"
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
