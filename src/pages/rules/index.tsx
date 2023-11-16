import { Typography } from "@mui/material";

import { text } from "@/assets/text";

function Rules() {
  // TODO: update page
  return (
    <Typography variant="h1" color="common.black" pt={15} textAlign="center">
      {text.general.howToPlay}
    </Typography>
  );
}

export default Rules;
