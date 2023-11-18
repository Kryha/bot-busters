import { api } from "@/utils/api";
import { signIn } from "next-auth/react";

export const useMergeUser = (address?: string, signedMessage?: string) => {
  const onSuccess = async () => {
    await signIn("credentials", {
      address: address,
      signedMessage: signedMessage,
    });
  };

  return api.user.mergeScore.useMutation({
    onSuccess,
  });
};
