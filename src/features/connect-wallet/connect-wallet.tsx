import { type FC } from "react";

import { UsernameSelect, ConnectPlaceholder } from "./components";

interface Props {
  isAuthenticated: boolean;
}

export const ConnectWallet: FC<Props> = ({ isAuthenticated }) => {
  // TODO: add check if the user already has a username & id

  if (isAuthenticated) return <UsernameSelect />;

  return <ConnectPlaceholder />;
};
