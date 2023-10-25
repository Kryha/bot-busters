import { type FC } from "react";

import { AddUsername, ConnectPlaceholder } from "./components";

interface Props {
  isAuthenticated: boolean;
}

export const ConnectWallet: FC<Props> = ({ isAuthenticated }) => {
  return <>{isAuthenticated ? <AddUsername /> : <ConnectPlaceholder />}</>;
};
