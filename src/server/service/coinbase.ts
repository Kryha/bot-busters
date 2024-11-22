import jwt from "jsonwebtoken";

import { env } from "~/env.mjs";

const signJwt = (uri: string) => {
  const token = jwt.sign(
    {
      aud: ["user_activity_report_service"],
      iss: "coinbase-cloud",
      nbf: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 10,
      sub: env.COINBASE_ORG,
      uri,
    },
    env.COINBASE_PRIVATE_KEY,
    {
      algorithm: "ES256",
      header: {
        alg: "ES256",
        kid: env.COINBASE_ORG,
      },
      // TODO: if nonce is needed check how to use it
      // header: {
      //   kid: env.COINBASE_ORG,
      //   nonce: Math.floor(Date.now() / 1000).toString(),
      // },
    },
  );
  return token;
};

export const coinbase = { signJwt };
