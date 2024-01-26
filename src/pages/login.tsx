import { type FC, useEffect, useState, useRef } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image.js";
import { Stack, type SxProps, Typography } from "@mui/material";
import { useRouter } from "next/router.js";

import { default as spinner } from "~/assets/images/spinner.gif";
import { useBBWallet } from "~/service/bb-wallet.js";
import { text } from "~/assets/text/index.js";
import { pages } from "~/router.js";
import Page from "~/components/page/page.jsx";
import { breakpoints } from "~/styles/theme.js";
import { api } from "~/utils/api.js";
import { type LoggedUserData } from "~/types/index.js";
import { RowCreateUsername } from "~/components/tables/components/index.js";

// TODO: move styles to another file
const styles = {
  wrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100vh",
  },
  container: {
    justifyContent: "space-between",
    height: "62.4%",
    [`@media (max-width: ${breakpoints.sm}px)`]: {
      pl: 4,
      pr: 4,
    },
  },
  progress: {
    gap: 10,
    alignItems: "center",
  },
  text: { alignItems: "center", mb: 10 } satisfies SxProps,
};

const SPINNER_SIZE = 34;

type LoginStage = "userCheck" | "connectWallet" | "verify" | "signIn";

const LoginLoading = () => (
  <Stack sx={styles.wrapper}>
    <Stack sx={styles.container}>
      <Stack sx={styles.progress}>
        <Typography variant="h5">{text.auth.connectYourWallet}</Typography>
        <Image
          src={spinner}
          alt="spinner"
          width={SPINNER_SIZE}
          height={SPINNER_SIZE}
        />
      </Stack>
      <Stack sx={styles.text}>
        <Typography variant="h5">{text.auth.weUseYourWallet}</Typography>
        <Typography variant="h5">{text.auth.weTransferToYourWallet}</Typography>
      </Stack>
    </Stack>
  </Stack>
);

interface SignInProps {
  signature: string;
  address: string;
}

const SignIn: FC<SignInProps> = ({ signature, address }) => {
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

interface UsernameSelectProps {
  address: string;
  signature: string;
  setLoginStage: (stage: LoginStage) => void;
}

const UsernameSelect: FC<UsernameSelectProps> = ({
  address,
  signature,
  setLoginStage,
}) => {
  const verify = api.user.verify.useMutation();
  const merge = api.user.mergeScore.useMutation();

  const shouldMerge = useRef(true);

  useEffect(() => {
    const attemptMerge = async () => {
      if (!shouldMerge.current) return;
      shouldMerge.current = false;

      const res = await merge.mutateAsync({ address, signature });

      if (res.isUsernameSet) {
        setLoginStage("signIn");
      }
    };

    attemptMerge().catch((err) => console.error(err));
  }, [address, merge, setLoginStage, signature]);

  const handleVerification = async (username: string) => {
    try {
      await verify.mutateAsync({ username, signature, address });
      setLoginStage("signIn");
    } catch (error) {
      console.error(error);
    }
  };

  if (merge.isLoading) return <LoginLoading />;

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <RowCreateUsername
          onSetUsername={handleVerification}
          error={verify.error?.message}
        />
      </Stack>
    </Stack>
  );
};

interface ConnectWalletProps {
  loggedUser?: LoggedUserData;
  setAddress: (address: string) => void;
  setSignature: (signature: string) => void;
  setLoginStage: (stage: LoginStage) => void;
}

const ConnectWallet: FC<ConnectWalletProps> = ({
  loggedUser,
  setAddress,
  setSignature,
  setLoginStage,
}) => {
  const { connect, isConnecting, getSignature, address } = useBBWallet();

  useEffect(() => {
    if (isConnecting) return;

    const authenticate = async () => {
      if (!address) {
        await connect();
      } else {
        const signature = await getSignature();

        setAddress(address);
        setSignature(signature);

        setLoginStage(loggedUser ? "verify" : "signIn");
      }
    };

    authenticate().catch((err) => console.error(err));
  }, [
    address,
    connect,
    getSignature,
    isConnecting,
    loggedUser,
    setAddress,
    setLoginStage,
    setSignature,
  ]);

  return <LoginLoading />;
};

const Login: FC = () => {
  const router = useRouter();

  const [loginStage, setLoginStage] = useState<LoginStage>("userCheck");
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");

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

  return <Page>{pageContent()}</Page>;
};

export default Login;
