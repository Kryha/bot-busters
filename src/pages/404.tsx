import { Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";

function Custom404() {
  return (
    <Typography variant="h1" pt={"50vh"} textAlign="center">
      {text.general.pageNotFound}
    </Typography>
  );
}

export default Custom404;
