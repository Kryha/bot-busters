/*
 * @jest-environment node
 */
import { closeDbConnection } from "../index";
import {
  insertAnonymousUsers,
  deleteUser,
  setUsername,
  setUserScore,
  type User,
  selectUserById,
} from "./user";

describe("Users CRUD API", () => {
  let testUser: User;

  afterAll(async () => {
    await closeDbConnection();
  });

  it("Should insert a anonymous user", async () => {
    const newUser = await insertAnonymousUsers();
    if (!newUser) return;

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

    const updatedUsers = await setUserScore(testUser.id, 1);
    const updatedUser = updatedUsers.at(0);

    if (!updatedUser) return;

    expect(updatedUser.score).toBe(1);
  });

  it("Sould delete the user", async () => {
    if (!testUser.id) return;

    await deleteUser(testUser.id);

    const deletedUser = await selectUserById(testUser.id);

    expect(deletedUser).toBeUndefined();
  });
});
