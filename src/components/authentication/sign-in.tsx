import { signIn } from "next-auth/react";
import { useRef, type FC, useEffect } from "react";

import { bbLocalStorage } from "~/utils/local-storage.js";
import { pages } from "~/router.js";

import { LoginLoading } from "./login-loading.jsx";

interface SignInProps {
  signature: string;
  address: string;
}

export const SignIn: FC<SignInProps> = ({ signature, address }) => {
  const signingIn = useRef(false);

  useEffect(() => {
    const authenticate = async () => {
      if (signingIn.current) return;

      signingIn.current = true;

      const coinbaseUuid = bbLocalStorage.getItem("COINBASE_UUID");

      const callbackUrl = coinbaseUuid
        ? `${pages.coinbaseLanding}?uuid=${coinbaseUuid}`
        : pages.leaderboard;

      await signIn("credentials", {
        signature,
        address,
        callbackUrl,
      });
    };

    authenticate().catch((err) => {
      signingIn.current = false;
      console.error(err);
    });
  }, [address, signature]);

  return <LoginLoading />;
};
