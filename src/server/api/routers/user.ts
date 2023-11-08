import { createTRPCRouter, protectedProcedure } from "../trpc";
import { selectUserById } from "@/server/db/schema";

export const userRouter = createTRPCRouter({
  getUserById: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session;

    const selectedUser = await selectUserById(id);
    console.log(selectedUser);
    return selectedUser;
  }),
});
