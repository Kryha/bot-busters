import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { type FC } from "react";

type ErrorType = "unauthenticated" | "notFound" | "general";

interface Props {
  errorType?: ErrorType;
}

const errorText: Record<ErrorType, string> = {
  notFound: "Hmmmm... Looks like this page doesn't exist.",
  unauthenticated:
    "Stop right there! This page is only for authenticated humans.",
  general: "Wooops! Seems like an error occurred.",
};

const componentText = {
  goHome: "Return to the home page",
};

export const ErrorView: FC<Props> = ({ errorType = "general" }) => {
  const router = useRouter();

  return (
    <Stack>
      <Typography variant="h2">{errorText[errorType]}</Typography>
      <Button onClick={() => void router.push("/")}>
        {componentText.goHome}
      </Button>
    </Stack>
  );
};
