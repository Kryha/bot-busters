import { Stack, Typography } from "@mui/material";

import { User } from "~/components/index.js";
import { text } from "~/assets/text/index.js";

import { styles } from "./styles.js";

export const UsernameLocal = () => {
  // TODO: Get username randomly
  return (
    <Stack sx={styles.container}>
      <Typography variant="body1">{text.match.inThisChat}</Typography>
      <User username={text.match.blueBird} />
    </Stack>
  );
};
