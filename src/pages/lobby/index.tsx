import { type FC } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Stack } from "@mui/material";

import { Page } from "@/layouts";
import withAuth from "@/utils/withAuth";
import { api } from "@/utils/api";

const Lobby: FC = () => {
  const router = useRouter();
  // TODO: update component

  api.lobby.onJoin.useSubscription(undefined, {
    onData(address) {
      console.log("[sub]", address, "joined");
    },
    onError(err) {
      console.error(err);
    },
  });

  const join = api.lobby.join.useMutation();

  return (
    <Page>
      <Typography variant="h1">Lobby</Typography>
      <Stack flexDirection="row" mt={2} gap={1}>
        <Button variant="text" onClick={() => void router.push("/")}>
          Back to home
        </Button>

        <Button variant="contained" onClick={() => join.mutate()}>
          Join
        </Button>

        <Button variant="contained" onClick={() => void router.push("/chat")}>
          Chat
        </Button>
      </Stack>
    </Page>
  );
};

export default withAuth(Lobby);
