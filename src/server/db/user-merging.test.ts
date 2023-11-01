/*
 * @jest-environment node
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

describe("Users Merging", () => {
  let db: ReturnType<typeof drizzle>;
  let queryClient: ReturnType<typeof postgres>;

  beforeAll(async () => {
    queryClient = postgres(process.env.TEST_DATABASE_URL!);
    db = drizzle(queryClient, { schema });
  });

  afterAll(async () => {
    await db.delete(schema.users);
    queryClient.end();
  });

  const createEmtyUsers = async (amount: number): Promise<schema.User[]> => {
    const createdEmptyUsers = await db
      .insert(schema.users)
      .values(Array(amount).fill({}))
      .returning();
    return createdEmptyUsers;
  };

  it("Should update existing user", async () => {
    const createdUsers = await createEmtyUsers(2);

    const [user1, user2] = createdUsers;

    const userWithAddress = expect(testUser).toBeDefined();
  });
});
