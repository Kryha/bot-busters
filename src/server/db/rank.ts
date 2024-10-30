import { isNotNull, max, sql } from "drizzle-orm";

import { db, type BBPgTransaction } from "~/server/db/index.js";
import { oldRanks, ranks, users } from "~/server/db/schema.js";

export const getCurrentSeason = async (tx?: BBPgTransaction) => {
  const dbTx = tx ?? db;

  const [seasonRes] = await dbTx
    .select({ prevSeason: max(oldRanks.season) })
    .from(oldRanks);
  const currentSeason = (seasonRes?.prevSeason ?? 0) + 1;

  return currentSeason;
};

// TODO: At the moment the ranks are decided by the score and the date of creation of the user.
// A more fair approach would be to make it so the first user to reach that Rank would remain there if another player reaches the same amount of points.
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

const expireRanksQuery = (season: number) => sql`
INSERT INTO ${oldRanks} (user_id, position, created_at, season, score, bots_busted)
    SELECT ${ranks.userId}, ${ranks.position}, ${ranks.createdAt}, ${season}, ${users.score}, ${users.botsBusted}
    FROM ${ranks} INNER JOIN ${users} ON ${users.id} = ${ranks.userId};
`;

const TRUNCATE_RANKS_QUERY = sql`TRUNCATE TABLE ${ranks};`;

export const expireRanks = async (tx?: BBPgTransaction) => {
  const dbTx = tx ?? db;

  const currentSeason = await getCurrentSeason(tx);
  await dbTx.execute(expireRanksQuery(currentSeason));
  await dbTx
    .update(users)
    .set({ score: 0, botsBusted: 0 })
    .where(isNotNull(users.id));
  await dbTx.execute(TRUNCATE_RANKS_QUERY);
};
