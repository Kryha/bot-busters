import { Stack, type StackProps } from "@mui/material";
import { type FC } from "react";
import { styles } from "./styles";
import Head from "next/head";

const headTitle = "Bot Busters";

export const Page: FC<StackProps> = (props) => {
  const { children } = props;

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content="Bust the bots!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack component="main" sx={styles.container}>
        {children}
      </Stack>
    </>
  );
};
