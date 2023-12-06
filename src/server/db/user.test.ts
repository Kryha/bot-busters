/*
 * @jest-environment node
 */
import { closeDbConnection } from "~/server/db/index.js";

import {
  insertAnonymousUser,
  setUserScore,
  deleteAllUsers,
  insertVerifiedUser,
} from "./user.js";

describe("Users CRUD API", () => {
  beforeEach(async () => {
    await deleteAllUsers();
  });

  afterAll(async () => {
    await closeDbConnection();
  });

  it("Should insert a anonymous user", async () => {
    const newAnonymousUser = await insertAnonymousUser();
    if (!newAnonymousUser) return;

    expect(newAnonymousUser).toBeDefined();
  });

  it("Should update the score ", async () => {
    const newAnonymousUser = await insertAnonymousUser();
    if (!newAnonymousUser?.id) return;

    const updatedUser = await setUserScore(newAnonymousUser.id, 1);

    expect(updatedUser).toBeDefined();
    if (!updatedUser) return;

    expect(updatedUser.score).toBe(1);
  });

  it("Should insert a verified user", async () => {
    const newVerifiedUser = await insertVerifiedUser(
      "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px",
      "testUserName"
    );
    expect(newVerifiedUser).toBeDefined();
    expect(newVerifiedUser?.address).toBe(
      "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px"
    );
    expect(newVerifiedUser?.username).toBe("testUserName");
  });

  it("Should not insert a verified user with an existing address", async () => {
    const existingUser = await insertVerifiedUser(
      "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px",
      "testUserName"
    );
    expect(existingUser).toBeDefined();

    const newUser = async () => {
      return await insertVerifiedUser(
        "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px",
        "testUserName2"
      );
    };
    await expect(newUser()).rejects.toThrow();
  });

  it("Should not insert a verified user with an existing username", async () => {
    const existingUser = await insertVerifiedUser(
      "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px",
      "testUserName"
    );
    expect(existingUser).toBeDefined();

    const newUser = async () => {
      return await insertVerifiedUser(
        "aleo1tes78447sw8vq0gyc2vqzwlmcvgg2jwes8d3qdveja2r9dejdqxsuegfts",
        "testUserName"
      );
    };

    await expect(newUser()).rejects.toThrow();
  });
});
