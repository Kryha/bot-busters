/**
 * Finds the nearest punctuation index to the middle of the string.
 * @param input The input string.
 * @returns The optimal index to split the string.
 */
function findSplitIndex(input: string): number {
  const middle = Math.ceil(input.length / 2);
  const lastSpace = input.lastIndexOf(" ", middle);

  const splitCharacters = [".", "!", "?"];

  const charIndexList = splitCharacters.map((character) =>
    input.lastIndexOf(character, middle),
  );

  const highestIndex = Math.max(...charIndexList);

  const splitIndex = highestIndex === -1 ? lastSpace : highestIndex;

  return splitIndex;
}

function removeTrailingCommaOrDot(input: string): string {
  const lastChar = input.charAt(input.length - 1);
  if (lastChar === "," || lastChar === ".") {
    return input.slice(0, -1);
  }
  return input;
}

/**
 * Refactored function to split a string at the nearest sentence boundary.
 * @param input The input string to be potentially split.
 * @returns An array containing either the original string or two split parts.
 */
export function splitMessage(input: string, maxLength: number): string[] {
  if (input.length <= maxLength) return [input]; // Return early if no split is needed.

  let splitIndex = findSplitIndex(input);

  // Adjust splitIndex to account for cases where no suitable punctuation was found.
  if (splitIndex === -1) {
    splitIndex = Math.ceil(input.length / 2); // Default split at middle if no punctuation.
  } else {
    splitIndex += 1; // Include the punctuation in the first part for a natural break.
  }

  const firstSegment = removeTrailingCommaOrDot(input.substring(0, splitIndex));
  const secondSegment = removeTrailingCommaOrDot(input.substring(splitIndex));

  return [firstSegment.trimStart(), secondSegment.trimStart()];
}

function removeEmojis(text: string): string {
  // Emoji matching pattern
  const emojiPattern =
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
  // Replace emojis with an empty string
  return text.replace(emojiPattern, "");
}

function removePromptAnomalies(input: string): string {
  // Removes //ufffd || </s> || *some expresion* || [INST] || (words in parenthesis) || gender symbols
  const parsedMessage = input.replace(
    /(\ufffd|\u2642|\u2640|\[\/?\w+\]?|<\/s>|(\*\w+(?:\s+\w+)*\*)|\*\w+\s)|(\(\w+(?:\s+\w+)*\))|\.$/g,
    "",
  );

  return parsedMessage;
}

function filterBlackList(input: string): string {
  // List of blacklisted words and sentences
  const blacklist = [
    "tough choice!",
    "that's tough!",
    "Oh boy,",
    "Oh wow,",
    "^_^",
  ];
  // Create a regex pattern to match any of the blacklisted words or sentences
  // The map function escapes special regex characters to ensure they are treated as literal strings
  const pattern = blacklist
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(pattern, "gi");

  return input.replace(regex, "").trimStart();
}

function filterUm(input: string): string {
  const combinedRegEx =
    /(Oh{1,4}|Hm{1,4}|Um{1,4}|Ugh{1,4}|Uh{1,4}|ph{1,4})(\.{1,3}|,{1})?/gi;
  return input.replace(combinedRegEx, "");
}

function removeCharacterNamePrefix(sentence: string): string {
  const characterNames = ["hal", "ash", "roy", "eve", "dot"];
  const regex = new RegExp(`^(${characterNames.join("|")}) said `, "i");

  return sentence.replace(regex, "");
}

export function cleanMessage(input: string): string {
  const parsedMessage = removePromptAnomalies(input);
  const noEmojisMessage = removeEmojis(parsedMessage);
  const whiteListMessage = filterBlackList(noEmojisMessage);
  const noNamePrefix = removeCharacterNamePrefix(whiteListMessage);
  const cleanedMessage = filterUm(noNamePrefix);

  return cleanedMessage.trimStart();
}
