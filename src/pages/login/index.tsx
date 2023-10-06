import { useSession } from "next-auth/react";
import { Typography, Stack, Button } from "@mui/material";
import { useRouter } from "next/router";

import { Page } from "@/layouts";
import { AuthButton } from "@/components/authentication";
import { isValidSession } from "@/utils/session";
import { api } from "@/utils/api";

// TODO: define text in another file
const Login = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  // TODO: remove example queries
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: isValidSession(sessionData) }
  );

  const renderHello = () => {
    if (hello.isLoading) return "Loading from tRPC...";
    if (hello.error) return "Error fetching from tRPC";
    if (hello.data) return hello.data.greeting;
    return "";
  };

  return (
    <Page>
      <Typography variant="h1">Bot Busters</Typography>
      <Typography variant="body1">
        Chat, be human and bust some bots!
      </Typography>

      <Typography variant="body1">{renderHello()}</Typography>

      <Typography variant="body1">
        {sessionData && (
          <Stack component="span">Address: {sessionData.publicKey}</Stack>
        )}
        {secretMessage && <Stack component="span"> - {secretMessage}</Stack>}
      </Typography>
      <Stack flexDirection="row" mt={2}>
        <AuthButton />
        {sessionData && (
          <Button variant="outlined" onClick={() => void router.push("/lobby")}>
            Lobby
          </Button>
        )}
      </Stack>
    </Page>
  );
};

export default Login;
