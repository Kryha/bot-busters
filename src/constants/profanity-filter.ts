import BadWordsFilter from "bad-words";
const badWords = ["fack"];

export const profanityFilter = new BadWordsFilter();

profanityFilter.addWords(...badWords);
