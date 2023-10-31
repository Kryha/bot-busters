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

});
