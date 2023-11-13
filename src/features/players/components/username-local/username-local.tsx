import { Stack, Typography } from "@mui/material";
import { styles } from "./styles";
import { User } from "../user";
import { text } from "../../text";

export const UsernameLocal = () => {
  // TODO: Get username randomly
  return (
    <Stack sx={styles.container}>
      <Typography variant="body1">{text.inThisChatRoom}</Typography>
      <User username={text.blueBird} />
    </Stack>
  );
};
