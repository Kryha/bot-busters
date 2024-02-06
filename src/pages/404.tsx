import { Stack } from "@mui/material";
import React, { type FC } from "react";

import { text } from "~/assets/text";
import { PageLayout } from "~/containers/page-layout/index.js";

const Custom404: FC = () => 
  <Stack mt="20vh">
    <PageLayout title={text.general.pageNotFound} />
  </Stack>

export default Custom404;
