import { Address, Signature } from "@aleohq/sdk";

export const verifySignature = (
  pubAddress: string,
  message: string,
  playerSign: string
): boolean => {
  const messageBuffer = new TextEncoder().encode(message);

  const signature = Signature.from_string(playerSign);
  const address = Address.from_string(pubAddress);

  const isVerified = signature.verify(address, messageBuffer);

  return isVerified;
};
