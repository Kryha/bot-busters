import { createTRPCRouter, protectedProcedure } from "../trpc.js";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs";
import { type RecaptchaResponse } from "~/types/recaptcha";

const SCORE_THRESHOLD = 0.5;
export const recaptchaRouter = createTRPCRouter({
  verify: protectedProcedure
    .input(z.object({ captchaToken: z.string() }))
    .mutation(async ({ input }) => {
      const { captchaToken } = input;

      // Check if it's (development mode)
      if (env.NODE_ENV === "development") {
        return false;
      }

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
         *  "success": true | false,    // whether this request was a valid reCAPTCHA token for your site
         *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
         *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
         *  "error-codes": [...]        // optional
         }
         */
        const json = (await response.json()) as RecaptchaResponse;

        if (!json.success) {
          console.log(`Recaptcha token is not valid`);
          throw new TRPCError({ code: "BAD_REQUEST" });
        }

        // If the score is below < SCORE_THRESHOLD, return true
        return json.score < SCORE_THRESHOLD;
      } catch (error) {
        console.log(`Recaptcha cannot be verified`);
      }
    }),
});
