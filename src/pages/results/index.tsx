import { type FC } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Stack } from "@mui/material";

import { Page } from "@/layouts";
import { pages } from "@/utils/router";

const Results: FC = () => {
  const router = useRouter();

  return (
    <Page>
      <Typography variant="h1">Results</Typography>
      <Stack flexDirection="row" mt={2} gap={1}>
        <Button variant="text" onClick={() => void router.push(pages.home)}>
          Back to home
        </Button>
        <Button
          variant="outlined"
          onClick={() => void router.push(pages.leaderboard)}
        >
          Leaderboard
        </Button>
      </Stack>
    </Page>
  );
};

export default Results;
