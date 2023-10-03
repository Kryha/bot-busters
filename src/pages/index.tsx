import Head from "next/head";
import Login from "./login";

// TODO: define text in another file
export default function Home() {
  return (
    <>
      <Head>
        <title>Bot Busters</title>
        <meta name="description" content="Bust the bots!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  );
}
