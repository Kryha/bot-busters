import { Stack, Typography } from "@mui/material";

import { User } from "~/components";
import { text } from "~/assets/text";

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
