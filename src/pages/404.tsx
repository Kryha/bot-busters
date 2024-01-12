import { Stack, Typography } from "@mui/material";
import React, { type FC } from "react";

import { text } from "~/assets/text";

const styles = {
  container: {
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Custom404: FC = () => {
  return (
    <Stack sx={styles.container}>
      <Typography variant="h1" textAlign="center">
        {text.general.pageNotFound}
      </Typography>
    </Stack>
  );
};
export default Custom404;
