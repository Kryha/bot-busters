import { Profanity, ProfanityOptions } from "@2toad/profanity";
import { badWords, whitelist } from "./words.js";

const options = new ProfanityOptions();
options.wholeWord = false;
options.grawlix = "****";

export const profanityFilter = new Profanity(options);

profanityFilter.addWords(badWords);
profanityFilter.whitelist.addWords(whitelist);
