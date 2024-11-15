import { Profanity, ProfanityOptions } from "@2toad/profanity";
import words from "naughty-words";
import { url, whitelist } from "./words.js";
const options = new ProfanityOptions();
options.wholeWord = false;
options.grawlix = "****";

export const profanityFilter = new Profanity(options);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
profanityFilter.addWords([...url, ...words.en]);
profanityFilter.whitelist.addWords(whitelist);
