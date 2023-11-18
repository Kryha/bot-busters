import { Typography } from "@mui/material";

import { text } from "@/assets/text";

function Privacy() {
  // TODO: update page
  return (
    <Typography variant="h1" color="common.black" pt={30} textAlign="center">
      {text.general.privacy}
    </Typography>
  );
}

export default Privacy;
