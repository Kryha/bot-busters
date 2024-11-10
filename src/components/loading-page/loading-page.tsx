import { type FC } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";

interface Props {
  description?: string;
  isLoading?: boolean;
}

export const LoadingPage: FC<Props> = ({ description, isLoading = true }) => (
  <Stack width="100%" pt="40vh" alignItems="center" spacing={3}>
    <Typography variant="h3">{description}</Typography>
    {isLoading && <CircularProgress />}
  </Stack>
);
