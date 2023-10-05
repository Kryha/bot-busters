import { type FC } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Stack } from "@mui/material";

import { Page } from "@/layouts";
import withAuth from "@/utils/withAuth";

const Results: FC = () => {
  const router = useRouter();

  return (
    <Page>
      <Typography variant="h1">Results</Typography>
      <Stack flexDirection="row" mt={2}>
        <Button variant="text" onClick={() => void router.push("/")}>
          Back to home
        </Button>
        <Button
          variant="outlined"
          onClick={() => void router.push("/leaderboard")}
        >
          Leaderboard
        </Button>
      </Stack>
    </Page>
  );
};

export default withAuth(Results);
