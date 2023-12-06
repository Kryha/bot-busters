import BadWordsFilter from "bad-words";
import { badWords } from "./bad-words";

export const profanityFilter = new BadWordsFilter();

profanityFilter.addWords(...badWords);
