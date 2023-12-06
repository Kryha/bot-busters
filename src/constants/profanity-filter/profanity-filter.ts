import BadWordsFilter from "bad-words";
//TODO: Add more bad words to filter
const badWords = ["fuck"];

export const profanityFilter = new BadWordsFilter();

profanityFilter.addWords(...badWords);
