import lodash from "lodash";

import { db } from "~/server/db/index.js";
import { users } from "~/server/db/schema.js";
import { leaderboard } from "~/server/service/index.js";

const newUsers = lodash.range(0, 30).map((i) => ({
  address: `addr${i}`,
  username: `testuser${i}`,
  score: Math.floor(Math.random() * 100),
}));

await db.insert(users).values(newUsers);
await leaderboard.calculate();

process.exit();
