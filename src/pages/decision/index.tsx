import { type FC } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Stack } from "@mui/material";

import { Page } from "@/layouts";
import { pages } from "@/utils/router";
import { text } from "@/assets/text";

const Decision: FC = () => {
  const router = useRouter();
  // TODO: update component

  return (
    <Page>
      <Typography variant="h1">Decision</Typography>
      <Stack flexDirection="row" mt={2} gap={1}>
        <Button variant="text" onClick={() => void router.push(pages.home)}>
          {text.navigation.backToHome}
        </Button>
        <Button
          variant="outlined"
          onClick={() => void router.push(pages.results)}
        >
          {text.general.results}
        </Button>
      </Stack>
    </Page>
  );
};

export default Decision;
