import { Stack, type StackProps } from "@mui/material";
import { type FC } from "react";

import { styles } from "./styles.js";

const Page: FC<StackProps> = (props) => {
  const { children } = props;

  return (
    <Stack component="section" sx={styles.container}>
      {children}
    </Stack>
  );
};

export default Page;
