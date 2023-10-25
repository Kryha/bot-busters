/* eslint-disable @typescript-eslint/unbound-method */
import { Button } from "@mui/material";
import { text } from "@/assets/text";
import { signIn } from "next-auth/react";

export const AnonymousAuthButton = () => {
  const authenticateAnonymous = async () => {
    try {
      await signIn("credentials", {});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={() => void authenticateAnonymous()}>
      {text.auth.playGame}
    </Button>
  );
};
