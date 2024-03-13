/**
 * Finds the nearest punctuation index to the middle of the string.
 * @param input The input string.
 * @param middle The middle index of the string.
 * @returns The optimal index to split the string.
 */
function findSplitIndex(input: string, middle: number): number {
  const periodIndex = input.lastIndexOf(".", middle);
  const commaIndex = input.lastIndexOf(",", middle);
  // Choose the closest punctuation to the middle, preferring periods.
  let splitIndex = periodIndex > commaIndex ? periodIndex : commaIndex;
  if (splitIndex === -1) {
    // If no punctuation found in the first half, search in the second half.
    splitIndex = Math.min(
      periodIndex === -1 ? input.length : periodIndex,
      commaIndex === -1 ? input.length : commaIndex,
    );
  }
  return splitIndex;
}

/**
 * Refactored function to split a string at the nearest sentence boundary.
 * @param input The input string to be potentially split.
 * @returns An array containing either the original string or two split parts.
 */
export function splitMessage(input: string, maxLength: number): string[] {
  if (input.length <= maxLength) return [input]; // Return early if no split is needed.

  let splitIndex = findSplitIndex(input, Math.ceil(input.length / 2));

  // Adjust splitIndex to account for cases where no suitable punctuation was found.
  if (splitIndex === -1) {
    splitIndex = Math.ceil(input.length / 2); // Default split at middle if no punctuation.
  } else {
    splitIndex += 1; // Include the punctuation in the first part for a natural break.
  }

  return [input.substring(0, splitIndex), input.substring(splitIndex)];
}

export function cleanMessage(input: string): string {
  // Removes //ufffd || </s> || *some expresion* || [INST] || (words in parenthesis) || gender symbols
  return input.replace(
    /(\ufffd|\u2642|\u2640|\[\/?INST\]?|<\/s>|(\*\w+(?:\s+\w+)*\*)|\*\w+\s)|(\(\w+(?:\s+\w+)*\))/g,
    "",
  );
}
