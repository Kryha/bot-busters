import { type FC } from "react";

import { UsernameSelect, ConnectPlaceholder } from "./components";

interface Props {
  isAuthenticated: boolean;
}

export const ConnectWallet: FC<Props> = ({ isAuthenticated }) => {
  if (isAuthenticated) return <UsernameSelect />;

  return <ConnectPlaceholder />;
};
