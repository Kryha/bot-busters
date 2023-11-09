import { Container, type StackProps } from "@mui/material";
import { type FC } from "react";
import { styles } from "./styles";

export const MatchLayout: FC<StackProps> = (props) => {
  const { children } = props;

  return (
    <Container component="main" sx={styles.container}>
      {children}
    </Container>
  );
};
