import { AUTH_SIGN_MESSAGE } from "@/constants";
import { Address, Signature } from "@aleohq/sdk";

export const verifySignature = (
  address: string,
  signedMessage: string
): boolean => {
  const messageBuffer = new TextEncoder().encode(AUTH_SIGN_MESSAGE);

  const signature = Signature.from_string(signedMessage);
  const addressObject = Address.from_string(address);

  const isVerified = signature.verify(addressObject, messageBuffer);

  return isVerified;
};
