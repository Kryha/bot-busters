import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

import { text } from "@/assets/text";
import { useBBWallet } from "@/hooks/bb-wallet";

export const LogoutButton = () => {
  const { disconnect } = useBBWallet();

  const logout = async () => {
    await signOut();
    await disconnect();
  };

  return <Button onClick={() => void logout()}>{text.auth.signOut}</Button>;
};
