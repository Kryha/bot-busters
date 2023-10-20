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

//TODO: remove this when we have random username generation
export const generateRandomString = (length: number) => {
  const letters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += letters[Math.floor(Math.random() * letters.length)];
  }
  return randomString;
};
