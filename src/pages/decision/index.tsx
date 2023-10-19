import { type FC } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Stack } from "@mui/material";

import { Page } from "@/layouts";
import withAuth from "@/utils/withAuth";

const Decision: FC = () => {
  const router = useRouter();
  // TODO: update component

  return (
    <Page>
      <Typography variant="h1">Decision</Typography>
      <Stack flexDirection="row" mt={2} gap={1}>
        <Button variant="text" onClick={() => void router.push("/")}>
          Back to home
        </Button>
        <Button
          variant="contained"
          onClick={() => void router.push("/results")}
        >
          Results
        </Button>
      </Stack>
    </Page>
  );
};

export default withAuth(Decision);
