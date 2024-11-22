export type LocalStorageKey =
  | "SFX_VOLUME"
  | "MUSIC_VOLUME"
  | "MASTER_VOLUME"
  | "COINBASE_UUID";

const setItem = (key: LocalStorageKey, value: string) =>
  localStorage.setItem(key, value);

const getItem = (key: LocalStorageKey) => localStorage.getItem(key);

const removeItem = (key: LocalStorageKey) => localStorage.removeItem(key);

export const bbLocalStorage = { setItem, getItem, removeItem };
