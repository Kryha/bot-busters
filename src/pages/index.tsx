import { useSession } from "next-auth/react";
import { Page } from "@/layouts";
import { isValidSession } from "@/utils/session";
import { Button, Stack, Typography } from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { AuthButton } from "@/components";

// TODO: define text in another file
export default function Home() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const join = api.lobby.join.useMutation();
  // TODO: finish and fix styling
  return (
    <Page>
      <Button variant="contained" onClick={() => void router.push("/login")}>
        Connect leo wallet
      </Button>
      <Typography variant="h1">Bot Busters</Typography>
      <Typography variant="body1">
        Chat, be human and bust some bots!
      </Typography>

      <Stack flexDirection="row" mt={2}>
        {isValidSession(sessionData) && (
          <Button
            disabled={join.status === "loading"}
            onClick={() => void router.push("/lobby")}
          >
            Play
          </Button>
        )}

        <AuthButton />
      </Stack>
    </Page>
  );
}
