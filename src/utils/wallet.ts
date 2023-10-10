import { AUTH_SIGN_MESSAGE } from "@/constants";
import { Address, Signature } from "@aleohq/sdk";

export const verifySignature = (
  publicKey: string,
  signedMessage: string
): boolean => {
  const messageBuffer = new TextEncoder().encode(AUTH_SIGN_MESSAGE);

  const signature = Signature.from_string(signedMessage);
  const address = Address.from_string(publicKey);

  const isVerified = signature.verify(address, messageBuffer);

  return isVerified;
};
