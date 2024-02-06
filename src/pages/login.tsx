import { type FC, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router.js";

import { pages } from "~/router.js";
import Page from "~/components/page/page.jsx";
import { api } from "~/utils/api.js";
import {
  ConnectWallet,
  LoginLoading,
  UsernameSelect,
  type LoginStage,
  SignIn,
} from "~/components/index.js";
import { PageLayout } from "~/containers/page-layout";
import { text } from "~/assets/text";

const Login: FC = () => {
  const router = useRouter();

  const [loginStage, setLoginStage] = useState<LoginStage>("userCheck");
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [pageHeader, setPageHeader] = useState("");

  const loggedUser = api.user.getLoggedUser.useQuery();

  useEffect(() => {
    const check = async () => {
      if (loggedUser.isInitialLoading || loginStage !== "userCheck") return;

      if (!loggedUser.data) {
        // user is not authenticated, create an anonymous one and make it go through the flow
        await signIn("credentials", {
          callbackUrl: pages.login,
        });
      } else if (loggedUser.data?.address && loggedUser.data.username) {
        // user is authenticated and verified so there is no point to authenticate
        void router.push(pages.home);
      } else {
        // user is lacking a username
        setLoginStage("connectWallet");
      }
    };

    check().catch((err) => console.error(err));
  }, [loggedUser, loginStage, router]);

  const pageContent = () => {
    switch (loginStage) {
      case "userCheck":
        return <LoginLoading />;
      case "connectWallet":
        setPageHeader(text.auth.connectYourWallet);
        return (
          <ConnectWallet
            setAddress={setAddress}
            setLoginStage={setLoginStage}
            setSignature={setSignature}
            loggedUser={loggedUser.data}
          />
        );
      case "verify":

        return (
          <UsernameSelect
            address={address}
            setLoginStage={setLoginStage}
            signature={signature}
          />
        );
      case "signIn":
        return <SignIn signature={signature} address={address} />;
    }
  };

  return <PageLayout title={pageHeader}>{pageContent()}</PageLayout>;
};

export default Login;
