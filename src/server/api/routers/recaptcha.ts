import { createTRPCRouter, protectedProcedure } from "../trpc.js";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs";

export const recaptchaRouter = createTRPCRouter({
  verify: protectedProcedure
    .input(z.object({ captchaToken: z.string() }))
    .mutation(async ({ input }) => {
      const { captchaToken } = input;
      try {
        // Verify the Google reCaptcha token v3
        const response = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=utf-8",
            },
            body: `secret=${env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
          },
        );

        /**
         * The structure of response from the verify API is
         * {
         *  "success": true | false,
         *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
         *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
         *  "error-codes": [...]        // optional
         }
         */
        const json = (await response.json()) as {
          success: boolean;
          score: number;
          challenge_ts: string;
          hostname: string;
          "error-codes"?: string[];
        };

        console.log("json recaptcha", json);
        if (!json.success) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }

        // If the score is below < 0.5, return true
        return json.score < 0.5;
      } catch (error) {
        console.log(`Recaptcha cannot be verified`);
      }
    }),
});
