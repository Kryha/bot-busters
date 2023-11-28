import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

import { text } from "~/assets/text/index.js";
import { useBBWallet } from "~/service/bb-wallet.js";

export const LogoutButton = () => {
  const { disconnect } = useBBWallet();

  const logout = async () => {
    await signOut();
    await disconnect();
  };

  return <Button onClick={() => void logout()}>{text.auth.signOut}</Button>;
};
