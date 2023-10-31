/*
 * @jest-environment node
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

describe("users CRUD", () => {
  let db: ReturnType<typeof drizzle>;
  let queryClient: ReturnType<typeof postgres>;
  let testUser: schema.User;

  beforeAll(async () => {
    queryClient = postgres(process.env.TEST_DATABASE_URL!);
    db = drizzle(queryClient, { schema });
  });

  afterAll(async () => {
    await db.delete(schema.users);
    queryClient.end();
  });

  it("should insert a new user", async () => {
    const newUsers = await db.insert(schema.users).values({}).returning();
    const newUser = newUsers.at(0);
    if (!newUser) return;
    testUser = newUser;

    expect(testUser).toBeDefined();
  });

  it("should update the user username ", async () => {
    if (!testUser.id) return;

    const updatedUsers = await db
      .update(schema.users)
      .set({ username: "testUserName" })
      .where(eq(schema.users.id, testUser.id))
      .returning();

    const updatedUser = updatedUsers.at(0);

    if (!updatedUser) return;

    expect(updatedUser.username).toBe("testUserName");
  });

  it("should update the user score ", async () => {
    if (!testUser.id) return;

    const updatedUsers = await db
      .update(schema.users)
      .set({ score: 1 })
      .where(eq(schema.users.id, testUser.id))
      .returning();

    const updatedUser = updatedUsers.at(0);

    if (!updatedUser) return;

    expect(updatedUser.score).toBe(1);
  });

  it("should delete the user", async () => {
    if (!testUser.id) return;

    await db
      .delete(schema.users)
      .where(eq(schema.users.id, testUser.id))
      .returning();

    const deletedUsers = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, testUser.id));

    const deletedUser = deletedUsers.at(0);

    expect(deletedUser).toBeUndefined();
  });
});
