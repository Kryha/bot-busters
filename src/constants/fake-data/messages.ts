// TODO: delete

import { type ChatMessageData } from "@/types";

export const messageData: ChatMessageData[] = [
  {
    username: "User A",
    avatar: "user_a_avatar.png",
    content: [
      "I love Mexican food! I'll have to check it out. Thanks for the tip!",
    ],
    isLocalUser: true,
    time: Date.now(),
  },
  {
    username: "User B",
    avatar: "user_b_avatar.png",
    content: [
      "I tried a new Mexican place called 'Sabor Mexicano' last week. Their tacos are amazing!",
    ],
    isLocalUser: false,
    time: Date.now(),
  },
  {
    username: "User A",
    avatar: "user_a_avatar.png",
    content: [
      "I'll definitely do that. By the way, have you been to any new restaurants in town recently?",
    ],
    isLocalUser: true,
    time: Date.now(),
  },
  {
    username: "User B",
    avatar: "user_b_avatar.png",
    content: [
      "You're welcome! Let me know what you think after you've read it.",
    ],
    isLocalUser: false,
    time: Date.now(),
  },
  {
    username: "User A",
    avatar: "user_a_avatar.png",
    content: ["I will, thanks for the recommendation!"],
    isLocalUser: true,
    time: Date.now(),
  },
  {
    username: "User B",
    avatar: "user_b_avatar.png",
    content: [
      "Absolutely! The author's attention to scientific detail makes it even more thrilling. You should definitely read it.",
    ],
    isLocalUser: false,
    time: Date.now(),
  },
  {
    username: "User A",
    avatar: "user_a_avatar.png",
    content: [
      "I've heard of 'The Martian'! It's on my to-read list. Is it as good as they say?",
    ],
    isLocalUser: true,
    time: Date.now(),
  },
  {
    username: "User B",
    avatar: "user_b_avatar.png",
    content: [
      "I'm currently engrossed in 'The Martian' by Andy Weir. This book is a captivating narrative that revolves around the thrilling tale of an astronaut who finds himself marooned on the desolate and unforgiving terrain of Mars, where he must muster every ounce of his ingenuity and resourcefulness to survive against all odds.",
      "It's so exciting!",
    ],
    isLocalUser: false,
    time: Date.now(),
  },
  {
    username: "User A",
    avatar: "user_a_avatar.png",
    content: [
      "That sounds awesome! I spent the weekend reading a great book.",
      "What book are you currently reading?",
    ],
    isLocalUser: true,
    time: Date.now(),
  },
  {
    username: "User B",
    avatar: "user_b_avatar.png",
    content: [
      "Hi User A!",
      "Yes, I had a wonderful weekend. Went hiking and spent time with family.",
      "How about you? Did you do anything fun?",
    ],
    isLocalUser: false,
    time: Date.now(),
  },
  {
    username: "User A",
    avatar: "user_a_avatar.png",
    content: ["Hey there! How's it going?", "I hope you had a great weekend."],
    isLocalUser: true,
    time: Date.now(),
  },
];
