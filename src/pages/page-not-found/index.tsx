import { Stack, Typography } from "@mui/material";
import React, { type FC } from "react";
import { text } from "~/assets/text";
import { styles } from "./styles";

const PageNotFound: FC = () => {
  return (
    <Stack sx={styles.container} >
      <Typography variant="h1" textAlign="center">
        {text.general.pageNotFound}
      </Typography>
    </Stack>
)};

export default PageNotFound;
