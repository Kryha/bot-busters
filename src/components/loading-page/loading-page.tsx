import { type FC } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";

interface Props {
  description?: string;
}

export const LoadingPage: FC<Props> = ({ description }) => (
  <Stack width="100%" pt="40vh" alignItems="center" spacing={3}>
    <Typography variant="h3">{description}</Typography>
    <CircularProgress />
  </Stack>
);
