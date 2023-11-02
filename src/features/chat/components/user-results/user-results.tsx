import { Divider, Stack, Typography, type StackProps } from "@mui/material";
import { type FC } from "react";
import { User } from "../user";
import { COLORS } from "../../constants";
import { styles } from "./styles";

export const UserResult: FC<StackProps> = ({ id }) => {
  const color = COLORS[Number(id)];
  const text = Number(id) % 2 === 0 ? "is a human!" : "is a bot!";

  return (
    <Stack sx={styles.container}>
      <Divider />
      <Stack sx={styles.user}>
        <User color={color} />
        <Typography
          variant="body1"
          // TODO: Fix new color to theme
          color="#4CAF50"
          sx={styles.text}
        >
          {text}
        </Typography>
      </Stack>
      <Divider />
    </Stack>
  );
};
