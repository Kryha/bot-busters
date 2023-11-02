/*
 * @jest-environment node
 */
import * as schema from "./schema";
import { closePostgressConnection, db, dbSchema } from "./index";
import {
  createAnonymousUsers,
  deleteUser,
  getUserById,
  setUsername,
  updateUserScore,
} from "./user";

describe("Users CRUD", () => {
  let testUser: schema.User;

  beforeAll(async () => {});

  afterAll(async () => {
    closePostgressConnection();
    //TODO: check if this needs to happen
    db.delete(dbSchema.users);
  });

  it("Should insert a new user", async () => {
    const newUser = await createAnonymousUsers();
    testUser = newUser;

    expect(testUser).toBeDefined();
  });

  it("Should update the username ", async () => {
    if (!testUser.id) return;

    const updatedUsers = await setUsername(testUser.id, "testUserName");
    const updatedUser = updatedUsers.at(0);

    if (!updatedUser) return;

    expect(updatedUser.username).toBe("testUserName");
  });

  it("Should update the score ", async () => {
    if (!testUser.id) return;

    const updatedUsers = await updateUserScore(testUser.id, 1);
    const updatedUser = updatedUsers.at(0);

    if (!updatedUser) return;

    expect(updatedUser.score).toBe(1);
  });

  it("Sould delete the user", async () => {
    if (!testUser.id) return;

    await deleteUser(testUser.id);

    const deletedUser = await getUserById(testUser.id);

    expect(deletedUser).toBeUndefined();
  });
});
