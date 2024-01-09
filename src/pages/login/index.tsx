import { type FC, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image.js";
import { Stack, type SxProps, Typography } from "@mui/material";
import { useRouter } from "next/router.js";

import { default as spinner } from "~/assets/images/spinner.gif";
import { useBBWallet } from "~/service/bb-wallet.js";
import { text } from "~/assets/text/index.js";
import { isVerifiedSession } from "~/utils/session.js";
import { pages } from "~/router.js";
import Page from "~/components/page/page.jsx";
import { breakpoints } from "~/styles/theme.js";

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

const Login: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { address, connect, isConnected, isConnecting, getSignature } =
    useBBWallet();

  useEffect(() => {
    const authenticate = async () => {
      try {
        if (isVerifiedSession(session)) {
          await router.push(pages.usernameSelect);
          return;
        }

        if (isConnecting) return;

        if (!isConnected) {
          await connect();
        } else {
          const signature = await getSignature();
          await signIn("credentials", {
            signature,
            address,
            callbackUrl: pages.home,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    void authenticate();
  }, [
    address,
    connect,
    getSignature,
    isConnected,
    isConnecting,
    router,
    session,
  ]);

  return (
    <Page>
      <Stack sx={styles.wrapper}>
        <Stack sx={styles.container}>
          <Stack sx={styles.progress}>
            <Typography variant="h5">{text.auth.connectYourWallet}</Typography>
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={spinner}
              alt="spinner"
              width={SPINNER_SIZE}
              height={SPINNER_SIZE}
            />
          </Stack>
          <Stack sx={styles.text}>
            <Typography variant="h5">{text.auth.weUseYourWallet}</Typography>
            <Typography variant="h5">
              {text.auth.weTransferToYourWallet}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Page>
  );
};

export default Login;
