import { Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { styles } from "~/styles/pages/about.js";

const wordsToLink: Record<string, string> = {
  "Kryha Labs": "https://kryha.io",
  Aleo: "https://aleo.org",
  zPass: "https://zpass.aleo.org/",
};

function About() {
  const getContent = () => {
    return text.about.content.map((text, key) => {
      const parts = text.split(
        new RegExp(`(${Object.keys(wordsToLink).join("|")})`, "gi"),
      );
      return (
        <Typography key={key} variant="body1" pt={5} sx={styles.body}>
          {parts.map((part, partIndex) => {
            const isLink = Object.keys(wordsToLink).some(
              (word) => word === part,
            );

            if (isLink) {
              return (
                <a key={partIndex} href={wordsToLink[part]}>
                  {part}
                </a>
              );
            }
            return part;
          })}
        </Typography>
      );
    });
  };
  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <Typography variant="h1" pt={15} textAlign="center" sx={styles.header}>
          {text.about.welcome}
        </Typography>
        {getContent()}
      </Stack>
    </Stack>
  );
}

export default About;
