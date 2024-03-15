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

  return [firstSegment, secondSegment];
}

export function cleanMessage(input: string): string {
  // Removes //ufffd || </s> || *some expresion* || [INST] || (words in parenthesis) || gender symbols
  return input.replace(
    /(\ufffd|\u2642|\u2640|\[\/?INST\]?|<\/s>|(\*\w+(?:\s+\w+)*\*)|\*\w+\s)/g,
    "",
  );
}
