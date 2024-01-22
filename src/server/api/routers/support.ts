import { z } from "zod";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import { env } from "~/env.mjs";

import { createTRPCRouter, publicProcedure } from "../trpc.js";

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
        sender: z.string().email(),
        message: z.string().min(1),
        subject: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const { sender, message, subject } = input;

      const command = new SendEmailCommand({
        Destination: {
          ToAddresses: [env.BB_EMAIL],
        },
        Message: {
          Body: {
            Text: { Data: message },
          },
          Subject: { Data: subject },
        },
        ReplyToAddresses: [sender],
        Source: env.BB_EMAIL,
      });

      await ses.send(command);
    }),
});
