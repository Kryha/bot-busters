import { type ContactListData } from "~/types/index.js";

export const contactListData: ContactListData[] = [
  {
    username: "John Doe",
    avatar: "john_avatar.png",
    lastMessage: "Hey, what's up?",
    time: Date.now(),
  },
  {
    username: "Alice Smith",
    avatar: "alice_avatar.png",
    lastMessage: "Sure thing! I'll be there in 10 minutes.",
    time: Date.now(),
  },
  {
    username: "Bob Johnson",
    avatar: "bob_avatar.png",
    lastMessage: "Can you send me the report?",
    time: Date.now(),
  },
  {
    username: "Eva Davis",
    avatar: "eva_avatar.png",
    lastMessage: "I'm looking forward to our meeting tomorrow.",
    time: Date.now(),
  },
  {
    username: "Chris Brown",
    avatar: "chris_avatar.png",
    lastMessage: "Thanks for your help!",
    time: Date.now(),
  },
];
