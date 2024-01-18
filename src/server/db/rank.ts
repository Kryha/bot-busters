import { sql } from "drizzle-orm";

import { db, type BBPgTransaction } from "~/server/db/index.js";
import { ranks, users } from "~/server/db/schema.js";

// TODO: At the moment the ranks are decided by the score and the date of creation of the user.
// A more fair approach would be to make it so the first user to reach that Rank would remain there if another player reaches the same amount of points.
// TODO: leaderboard has to be calculated based on daily data
const UPDATE_RANKS_QUERY = sql`
TRUNCATE TABLE ${ranks};

INSERT INTO ${ranks}
SELECT
    ${users.id} AS user_id,
    RANK () OVER (ORDER BY ${users.score} DESC, ${users.createdAt}, ${users.id}) AS position
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
