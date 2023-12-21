import { Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";

function About() {
  return (
    <Typography variant="h1" pt={15} textAlign="center">
      {text.general.about}
    </Typography>
  );
}

export default About;
