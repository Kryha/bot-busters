import { z } from "zod";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import { env } from "~/env.mjs";

import { createTRPCRouter, publicProcedure } from "../trpc.js";
import { validEmail, validIssue, validTopic } from "~/constants/validation.js";

const ses = new SESClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET,
  },
});

export const supportRouter = createTRPCRouter({
  sendEmail: publicProcedure
    .input(
      z.object({
        email: validEmail,
        issue: validIssue,
        topic: validTopic,
      }),
    )
    .mutation(async ({ input }) => {
      const { email, issue, topic } = input;

      const command = new SendEmailCommand({
        Destination: {
          ToAddresses: [env.BB_EMAIL],
        },
        Message: {
          Body: {
            Text: { Data: issue },
          },
          Subject: { Data: topic },
        },
        ReplyToAddresses: [email],
        Source: env.BB_EMAIL,
      });

      await ses.send(command);
    }),
});
