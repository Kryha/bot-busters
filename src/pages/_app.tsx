import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { useMemo } from "react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import Head from "next/head";

import "~/styles/globals.css";
import { api } from "~/utils/api.js";
import { ThemeProvider } from "~/features/mui/index.js";
import { APP_NAME } from "~/constants/index.js";
import { Layout } from "~/layouts/index.js";

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
    []
  );

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
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionProvider>
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
