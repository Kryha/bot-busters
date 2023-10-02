import { useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "@/utils/api";
import { Container, Typography } from "@mui/material";
import { isValidSession } from "@/utils/session";
import { AuthButton } from "@/components/authentication";

// TODO: define text in another file
export default function Home() {
  const { data: sessionData } = useSession();

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

          <Typography variant="body1">
            {sessionData && <span>Address: {sessionData.publicKey}</span>}
            {secretMessage && <span> - {secretMessage}</span>}
          </Typography>

          <AuthButton />
        </Container>
      </main>
    </>
  );
}
