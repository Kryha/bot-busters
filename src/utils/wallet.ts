/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Address, Signature } from "@provablehq/sdk";

import { AUTH_SIGN_MESSAGE } from "~/constants/index.js";

export const verifySignature = (
  address: string,
  signedMessage: string,
): boolean => {
  const messageBuffer = new TextEncoder().encode(AUTH_SIGN_MESSAGE);

  const signature = Signature.from_string(signedMessage);
  const addressObject = Address.from_string(address);

  const isVerified = signature.verify(addressObject, messageBuffer);

  return Boolean(isVerified);
};
