import { type FC } from "react";

import { Page } from "@/layouts";
import { WalletConnect } from "@/features/wallet-connect";

const Login: FC = () => {
  return (
    <Page>
      <WalletConnect />
    </Page>
  );
};

export default Login;
