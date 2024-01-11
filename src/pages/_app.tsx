import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app.js";
import { useMemo } from "react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import Head from "next/head.js";

import "~/styles/globals.css";
import { api } from "~/utils/api.js";
import { ThemeProvider } from "~/styles/index.js";
import { APP_NAME } from "~/constants/index.js";
import { useRouter } from "next/router.js";
import { pages } from "~/router.js";
import { Layout } from "~/containers/layout/index.js";

const headTitle = "Bot Busters";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: APP_NAME,
      }),
    ],
    [],
  );

  const router = useRouter();
  const animationLab = router.pathname === pages.animationLab;

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content="Bust the bots!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <ThemeProvider>
            <SessionProvider session={session}>
              {animationLab ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </SessionProvider>
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
