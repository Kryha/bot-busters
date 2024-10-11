import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app.js";
import { useEffect, useMemo, useState } from "react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";
import Head from "next/head.js";
import { ErrorBoundary } from "react-error-boundary";

import { api } from "~/utils/api.js";
import { breakpoints, ThemeProvider } from "~/styles/index.js";
import { APP_NAME } from "~/constants/index.js";
import { useRouter } from "next/router.js";
import { pages } from "~/router.js";
import { AppContainer } from "~/containers/app-container/index.js";
import { ErrorFallback } from "~/components/index.js";
import { SoundProvider } from "~/containers/sound-provider/index.js";
import { useViewport } from "~/hooks/use-viewport.js";
import { MobileScreen } from "~/components/mobile-screen/index.js";
import "~/styles/globals.css";

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
  const isHomePage = router.pathname === pages.home;

  const { width } = useViewport();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (width) {
      setIsMobile(width <= breakpoints.md);
    }
  }, [width]);

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content="Bust the bots!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WalletProvider
        wallets={wallets}
        network={WalletAdapterNetwork.MainnetBeta}
      >
        <WalletModalProvider>
          <ThemeProvider>
            <SessionProvider session={session}>
              <SoundProvider>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  {isHomePage ? (
                    isMobile ? (
                      <MobileScreen />
                    ) : (
                      <Component {...pageProps} />
                    )
                  ) : (
                    <AppContainer>
                      <Component {...pageProps} />
                    </AppContainer>
                  )}
                </ErrorBoundary>
              </SoundProvider>
            </SessionProvider>
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
