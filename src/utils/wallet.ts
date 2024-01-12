import { Address, Signature } from "@aleohq/sdk";

import { AUTH_SIGN_MESSAGE } from "~/constants/index.js";

export const verifySignature = (
  address: string,
  signedMessage: string,
): boolean => {
  const messageBuffer = new TextEncoder().encode(AUTH_SIGN_MESSAGE);

  const signature = Signature.from_string(signedMessage);
  const addressObject = Address.from_string(address);

  const isVerified = signature.verify(addressObject, messageBuffer);

  return isVerified;
};
