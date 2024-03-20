export const processTextToLink = (
  text: string,
  wordsToLink: Record<string, string>,
): (string | JSX.Element)[] => {
  const parts = text.split(
    new RegExp(`(${Object.keys(wordsToLink).join("|")})`, "gi"),
  );

  return parts.map((part, index) => {
    const isLink = Object.keys(wordsToLink).some((word) => word === part);

    if (isLink) {
      return (
        <a key={index} href={wordsToLink[part]} target={"_blank"}>
          {part}
        </a>
      );
    }
    return part;
  });
};
