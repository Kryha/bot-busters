import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { useMemo } from "react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { api } from "@/utils/api";
import { ThemeProvider } from "@/features/mui";
import "@/styles/globals.css";
import { APP_NAME } from "@/constants";
import Head from "next/head";
import { Layout } from "@/layouts";
import { useRouter } from "next/router";

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
  const animationLab = router.pathname === "/animationlab";

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
