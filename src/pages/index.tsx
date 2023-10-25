import { useSession } from "next-auth/react";
import { Page } from "@/layouts";
import { isValidSession } from "@/utils/session";
import { Button, Stack, Typography } from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { AuthButton } from "@/components";
import { pages } from "@/utils/router";

// TODO: define text in another file
export default function Home() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const join = api.lobby.join.useMutation();

  return (
    <Page>
      <Typography variant="h1">Bot Busters</Typography>
      <Typography variant="body1">
        Chat, be human and bust some bots!
      </Typography>

      <Stack flexDirection="row" mt={2}>
        {isValidSession(sessionData) && (
          <Button
            disabled={join.status === "loading"}
            onClick={() => void router.push(pages.lobby)}
          >
            Play
          </Button>
        )}

        <AuthButton />
      </Stack>
    </Page>
  );
}
