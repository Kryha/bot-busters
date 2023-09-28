import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "@/utils/api";
import { Button, Container, Typography } from "@mui/material";

// TODO: define text in another file
export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const renderHello = () => {
    if (hello.isLoading) return "Loading from tRPC...";
    if (hello.error) return "Error fetching from tRPC";
    if (hello.data) return hello.data.greeting;
    return "";
  };

  return (
    <>
      <Head>
        <title>Bot Busters</title>
        <meta name="description" content="Bust the bots!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Typography variant="h1">Bot Busters</Typography>
          <Typography variant="body1">
            Chat, be human and bust some bots!
          </Typography>

          <Typography variant="body1">{renderHello()}</Typography>

          <AuthShowcase />
        </Container>
      </main>
    </>
  );
}

// TODO: use wallet login instead of discord
function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <Container>
      <Typography variant="body1">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </Typography>

      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </Container>
  );
}
