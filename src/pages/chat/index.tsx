import { type FC } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Stack } from "@mui/material";

import { Page } from "@/layouts";
import withAuth from "@/utils/withAuth";

const Chat: FC = () => {
  const router = useRouter();
  // TODO: update component

  return (
    <Page>
      <Typography variant="h1">Chat</Typography>
      <Stack flexDirection="row" mt={2}>
        <Button variant="text" onClick={() => void router.push("/")}>
          Back to home
        </Button>
        <Button
          variant="outlined"
          onClick={() => void router.push("/decision")}
        >
          Decision
        </Button>
      </Stack>
    </Page>
  );
};

export default withAuth(Chat);
