/* eslint-disable @typescript-eslint/unbound-method */
import { Button, Stack } from "@mui/material";
import { text } from "@/assets/text";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { signOut, useSession } from "next-auth/react";
import { isValidSession } from "@/utils/session";
import { AnonymousAuthenticationButton } from "./anonymous";
import { WalletAuthenticationButton } from "./wallet";

export const AuthButton = () => {
  const { data: sessionData } = useSession();
  const { disconnect } = useWallet();

  const logout = async () => {
    await signOut();
    await disconnect();
  };

  return !isValidSession(sessionData) ? (
    <Stack direction="row" spacing={2}>
      <AnonymousAuthenticationButton />
      <WalletAuthenticationButton />
    </Stack>
  ) : (
    <Button onClick={() => void logout()}>{text.auth.signOut}</Button>
  );
};
