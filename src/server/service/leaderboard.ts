import { type BBPgTransaction } from "~/server/db/index.js";
import { updateRanks } from "~/server/db/rank.js";

const calculate = (tx?: BBPgTransaction) => updateRanks(tx);

export const leaderboard = { calculate };
