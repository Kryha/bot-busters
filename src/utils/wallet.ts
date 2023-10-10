import { Address, Signature } from "@aleohq/sdk";

export const verifySignature = (
  publicKey: string,
  message: string,
  signedMessage: string
): boolean => {
  const messageBuffer = new TextEncoder().encode(message);

  const signature = Signature.from_string(signedMessage);
  const address = Address.from_string(publicKey);

  const isVerified = signature.verify(address, messageBuffer);

  return isVerified;
};
