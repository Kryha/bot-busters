import { useSession } from "next-auth/react";
import { Page } from "@/layouts";
import { isValidSession } from "@/utils/session";
import { Button, Stack, Typography } from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthButton } from "@/components";

// TODO: define text in another file
export default function Home() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const join = api.lobby.join.useMutation();

  useEffect(() => {
    console.log("home effect");
    if (join.status === "success") {
      const { myPlaceInQueue, queueLength } = join.data;

      void router.push({
        pathname: "/lobby",
        query: { myPlaceInQueue, queueLength },
      });
    }
  }, [join.data, join.status, router]);

  return (
    <Page>
      <Typography variant="h1">Bot Busters</Typography>
      <Typography variant="body1">
        Chat, be human and bust some bots!
      </Typography>

      <Stack flexDirection="row" mt={2}>
        {isValidSession(sessionData) && (
          <Button onClick={() => join.mutate()}>Play</Button>
        )}

        <AuthButton />
      </Stack>
    </Page>
  );
}
