import { Stack, type StackProps } from "@mui/material";
import { type FC } from "react";
import { styles } from "./styles";
import Head from "next/head";

export const Page: FC<StackProps> = (props) => {
  const { children } = props;

  return (
    <>
      <Head>
        <title>Bot Busters</title>
        <meta name="description" content="Bust the bots!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack component="main" sx={styles.container}>
        {children}
      </Stack>
    </>
  );
};
