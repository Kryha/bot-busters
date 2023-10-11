import { type ContactList, type ChatMessage } from "@/types";
import { type StateCreator } from "zustand";
import { contactListData, messageData } from "./fake-data";

export interface ChatSlice {
  messages: ChatMessage[];
  contactList: ContactList[];

  addMessage: (message: ChatMessage) => void;
  setContactList: (contactList: ContactList[]) => void;
  clearMessages: () => void;
}

export const createChatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = (
  set
) => ({
  messages: messageData,
  contactList: contactListData,

  addMessage: (message) =>
    set(({ messages }) => {
      return { messages: [message, ...messages] };
    }),
  setContactList: (contactList) => set(() => ({ contactList })),
  clearMessages: () => set(() => ({ messages: [] })),
});
