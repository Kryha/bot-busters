import { sql } from "drizzle-orm";

import { db, type BBPgTransaction } from "~/server/db/index.js";
import { ranks, users } from "~/server/db/schema.js";

const UPDATE_RANKS_QUERY = sql`
TRUNCATE TABLE ${ranks};

INSERT INTO ${ranks}
SELECT
    ${users.id} AS user_id,
    RANK () OVER (ORDER BY ${users.score} DESC, ${users.createdAt}) AS position
FROM ${users}
WHERE
    ${users.username} IS NOT NULL AND
    ${users.address} IS NOT NULL AND
    ${users.score} > 0;
`;

export const updateRanks = async (tx?: BBPgTransaction) => {
  const dbTx = tx ?? db;
  await dbTx.execute(UPDATE_RANKS_QUERY);
};
