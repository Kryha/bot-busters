import { type FC } from "react";
import { Stack, type StackProps } from "@mui/material";
import { PageHeader } from "../page-header";

const styles = {
  container: {},
  content: {},
};

export const StaticPage: FC<{ title: string } & StackProps> = ({
  title,
  children,
}) => (
  <Stack sx={styles.container}>
    <PageHeader text={title} />
    <Stack sx={styles.content}>{children}</Stack>
  </Stack>
);
