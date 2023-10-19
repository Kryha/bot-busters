import { type ContactList } from "@/types";

export const contactListData: ContactList[] = [
  {
    username: "John Doe",
    avatar: "john_avatar.png",
    lastMessage: "Hey, what's up?",
    time: new Date(2023, 6, 22).toString(),
  },
  {
    username: "Alice Smith",
    avatar: "alice_avatar.png",
    lastMessage: "Sure thing! I'll be there in 10 minutes.",
    time: new Date(2023, 8, 24).toString(),
  },
  {
    username: "Bob Johnson",
    avatar: "bob_avatar.png",
    lastMessage: "Can you send me the report?",
    time: new Date(2023, 9, 9).toString(),
  },
  {
    username: "Eva Davis",
    avatar: "eva_avatar.png",
    lastMessage: "I'm looking forward to our meeting tomorrow.",
    time: new Date(2023, 9, 12).toString(),
  },
  {
    username: "Chris Brown",
    avatar: "chris_avatar.png",
    lastMessage: "Thanks for your help!",
    time: new Date().toString(),
  },
];
