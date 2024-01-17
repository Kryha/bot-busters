import { Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { styles } from "~/styles/pages/about.js";
import { processTextToLink } from "~/utils/links.jsx";

function About() {
  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <Typography variant="h1" pt={15} textAlign="center" sx={styles.header}>
          {text.about.welcome}
        </Typography>
        {text.about.content.map((content: string, key: number) => (
          <Typography key={key} variant="body1" pt={5} sx={styles.body}>
            {processTextToLink(content, text.wordsToLinkAbout)}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}

export default About;
