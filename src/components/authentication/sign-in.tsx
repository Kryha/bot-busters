import { signIn } from "next-auth/react";
import { useRef, type FC, useEffect } from "react";

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

      await signIn("credentials", {
        signature,
        address,
        callbackUrl: pages.leaderboard,
      });
    };

    authenticate().catch((err) => {
      signingIn.current = false;
      console.error(err);
    });
  }, [address, signature]);

  return <LoginLoading />;
};
