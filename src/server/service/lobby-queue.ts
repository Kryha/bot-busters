class LobbyQueue {
  private _listeners = new Map<string, number>();
  private _queue: string[] = [];

  get queue() {
    return this._queue;
  }

  join(userId: string) {
    const count = this._listeners.get(userId);
    const newCount = count ? count + 1 : 1;

    this._listeners.set(userId, newCount);

    if (newCount === 1) {
      this._queue.push(userId);
    }

    return newCount;
  }

  leave(userId: string) {
    const count = this._listeners.get(userId);

    if (!count) return;

    if (count <= 1) {
      this._listeners.delete(userId);

      const index = this._queue.indexOf(userId);
      this._queue.splice(index, 1);
    } else {
      this._listeners.set(userId, count - 1);
    }
  }

  pickPlayers(humansInMatch: number) {
    const ids = this._queue.splice(0, humansInMatch);

    ids.forEach((id) => this._listeners.delete(id));

    return ids;
  }

  getPlayerPosition(userId: string) {
    return this._queue.indexOf(userId) + 1;
  }

  has(userId: string) {
    return !!this._listeners.get(userId);
  }
}

export const lobbyQueue = new LobbyQueue();
