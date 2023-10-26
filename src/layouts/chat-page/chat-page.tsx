import { Container, type StackProps } from "@mui/material";
import { type FC } from "react";
import { styles } from "./styles";
import Head from "next/head";

const headTitle = "Bot Busters Chat";

export const ChatPage: FC<StackProps> = (props) => {
  const { children } = props;

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content="Bust the bots!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container component="main" maxWidth="lg" sx={styles.container}>
        {children}
      </Container>
    </>
  );
};
