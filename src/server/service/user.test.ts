/*
 * @jest-environment node
 */
import { closeDbConnection } from "@/server/db";
import {
  insertAnonymousUsers,
  deleteUser,
  setUsername,
  setUserScore,
  selectUserById,
  deleteAllUsers,
  insertVerifiedUser,
  mergeUserScore,
} from "./user";

describe("Users CRUD API", () => {
  beforeEach(async () => {
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
  it("Should merge the anonymous user with the verified user", async () => {
    const newAnonymousUser = await insertAnonymousUsers();
    if (!newAnonymousUser?.id) return;

    const newVerifiedUser = await insertVerifiedUser(
      "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px",
      "testUserName"
    );
    if (!newVerifiedUser?.id) return;

    await setUserScore(newAnonymousUser.id, 5);
    await setUserScore(newVerifiedUser.id, 10);

    const mergeUser = await mergeUserScore(
      newAnonymousUser.id,
      newVerifiedUser.id
    );

    expect(mergeUser).toBeDefined();
    expect(mergeUser?.score).toBe(15);
    expect(mergeUser?.id).toBe(newVerifiedUser.id);

    expect(await selectUserById(newAnonymousUser.id)).toBeUndefined();
  });
  it("Should not merge the anonymous user with the verified user if the verified user does not exist", async () => {
    const newAnonymousUser = await insertAnonymousUsers();
    if (!newAnonymousUser?.id) return;

    const newVerifiedUser =
      "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px";

    await setUserScore(newAnonymousUser.id, 5);

    const mergeUser = async () => {
      await mergeUserScore(newAnonymousUser.id, newVerifiedUser);
    };

    await expect(mergeUser()).rejects.toThrow();
  });
});
