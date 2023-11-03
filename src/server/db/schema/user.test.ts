/*
 * @jest-environment node
 */
import { closeDbConnection } from "../index";
import {
  insertAnonymousUsers,
  deleteUser,
  setUsername,
  setUserScore,
  selectUserById,
  deleteAllUsers,
} from "./user";

describe("Users CRUD API", () => {
  beforeAll(async () => {
    await deleteAllUsers();
  });

  afterAll(async () => {
    await closeDbConnection();
  });

  it("Should insert a anonymous user", async () => {
    const newAnonymousUser = await insertAnonymousUsers();
    if (!newAnonymousUser) return;

    expect(newAnonymousUser).toBeDefined();
  });

  it("Should update the username ", async () => {
    const newAnonymousUser = await insertAnonymousUsers();
    if (!newAnonymousUser?.id) return;

    const updatedUser = await setUsername(newAnonymousUser.id, "testUserName");

    expect(updatedUser).toBeDefined();
    if (!updatedUser) return;
    expect(updatedUser.username).toBe("testUserName");
  });

  it("Should update the score ", async () => {
    const newAnonymousUser = await insertAnonymousUsers();
    if (!newAnonymousUser?.id) return;

    const updatedUser = await setUserScore(newAnonymousUser.id, 1);

    expect(updatedUser).toBeDefined();
    if (!updatedUser) return;

    expect(updatedUser.score).toBe(1);
  });

  it("Should delete the user", async () => {
    const newAnonymousUser = await insertAnonymousUsers();
    if (!newAnonymousUser?.id) return;

    await deleteUser(newAnonymousUser.id);

    const deletedUser = await selectUserById(newAnonymousUser.id);

    expect(deletedUser).toBeUndefined();
  });
});
