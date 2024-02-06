import { Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { PageLayout } from "~/containers/page-layout";
import { styles } from "~/styles/pages/about.js";
import { processTextToLink } from "~/utils/links.jsx";

const About = () => (
  <PageLayout title={text.about.welcome}>
    {text.about.content.map((content: string, key: number) => (
      <Typography
        key={key}
        variant="body1"
        pt={key === 0 ? 0 : 5}
        sx={styles.body}
      >
        {processTextToLink(content, text.wordsToLinkAbout)}
      </Typography>
    ))}
    <Stack pt="100px" />
  </PageLayout>
);

export default About;
