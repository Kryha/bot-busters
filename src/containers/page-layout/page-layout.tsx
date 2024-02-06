import { type FC } from "react";
import { Stack, type StackProps } from "@mui/material";

import { layout } from "~/constants/layout.js";

import { PageHeader } from "../page-header/index.js";

const styles = {
  container: {
    alignItems: "center",
  },
  content: {
    width: layout.width.relative,
    maxWidth: layout.width.max,
    minWidth: layout.width.min,
    alignItems: "center",
  },
};

export const PageLayout: FC<{ title?: string } & StackProps> = ({
  title,
  children,
}) => (
  <Stack sx={styles.container}>
    <Stack sx={styles.content}>
      {title && <PageHeader text={title} />}
      {children}
    </Stack>
  </Stack>
);
