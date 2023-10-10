import { useState, type FC } from "react";
import { useRouter } from "next/router";

import { Page } from "@/layouts";
import withAuth from "@/utils/withAuth";
import { ChatDrawer } from "@/components";
import { Typography, Stack, Button } from "@mui/material";

const Chat: FC = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(true);
  // TODO: update component

  return (
    <Page>
      <ChatDrawer open={toggle} toggle={() => setToggle} />
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
