import { Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { PageHeader } from "~/containers/page-header/index.js";
import { styles } from "~/styles/pages/about.js";
import { processTextToLink } from "~/utils/links.jsx";
import { useRedirectIfPlayingMatch } from "~/hooks/match.js";

function About() {
  useRedirectIfPlayingMatch();

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <PageHeader text={text.about.welcome} />
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
