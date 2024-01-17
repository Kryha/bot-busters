import { Profanity, ProfanityOptions } from "@2toad/profanity";
import englishWords from "naughty-words/en.json" assert { type: "json" };
import { url, whitelist } from "./words.js";
const options = new ProfanityOptions();
options.wholeWord = false;
options.grawlix = "****";

export const profanityFilter = new Profanity(options);

profanityFilter.addWords([...url, ...englishWords]);
profanityFilter.whitelist.addWords(whitelist);
