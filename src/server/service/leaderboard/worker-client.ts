import path from "node:path";
import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";

import { type UpdateScoreArgs } from "./types.js";

const updateScores = (args: UpdateScoreArgs) => {
  return new Promise((resolve, reject) => {
    // `__dirname` is not available when using ESM in Node
    const filename = fileURLToPath(import.meta.url);
    const workerPath = path.join(filename, "..", "worker.js");

    const worker = new Worker(workerPath, { workerData: args });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

export const leaderboardWorker = { updateScores };
