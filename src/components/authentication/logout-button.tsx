/* eslint-disable @typescript-eslint/unbound-method */
import { Button } from "@mui/material";
import { text } from "@/assets/text";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  const { disconnect } = useWallet();

  const logout = async () => {
    await signOut();
    await disconnect();
  };

  return <Button onClick={() => void logout()}>{text.auth.signOut}</Button>;
};
