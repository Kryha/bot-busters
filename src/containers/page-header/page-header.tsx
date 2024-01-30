import { type FC } from "react";
import { Typography } from "@mui/material";

export const PageHeader: FC<{ text: string }> = ({ text }) => (
  <Typography
    variant="h1"
    color="common.black"
    sx={{
      mt: "90px",
      mb: "50px",
      textAlign: "center",
    }}
  >
    {text}
  </Typography>
);
