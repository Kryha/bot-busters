import { type User } from "~/server/db/schema.js";

class LobbyQueue {
  private _listeners = new Map<string, number>();
  private _queue: User[] = [];

  get queue() {
    return this._queue;
  }

  join(user: User) {
    const count = this._listeners.get(user.id);
    const newCount = count ? count + 1 : 1;

    this._listeners.set(user.id, newCount);

    if (newCount === 1) {
      this._queue.push(user);
    }

    return newCount;
  }

  leave(userId: string) {
    const count = this._listeners.get(userId);

    if (!count) return;

    if (count <= 1) {
      this._listeners.delete(userId);

      const index = this._queue.findIndex((u) => u.id === userId);
      this._queue.splice(index, 1);
    } else {
      this._listeners.set(userId, count - 1);
    }
  }

  pickPlayers(humansInMatch: number) {
    const users = this._queue.splice(0, humansInMatch);

    users.forEach((user) => this._listeners.delete(user.id));

    return users;
  }

  getPlayerPosition(userId: string) {
    return this._queue.findIndex((u) => u.id === userId) + 1;
  }

  has(userId: string) {
    return !!this._listeners.get(userId);
  }
}

export const lobbyQueue = new LobbyQueue();
