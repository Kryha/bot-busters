import { Stack } from "@mui/material";
import React, { type FC } from "react";

import { errorMessage } from "~/constants/error-messages";
import { PageLayout } from "~/containers/page-layout/index.js";

const Custom500: FC = () => (
  <Stack mt="20vh">
    <PageLayout title={errorMessage[500]} />
  </Stack>
);

export default Custom500;
