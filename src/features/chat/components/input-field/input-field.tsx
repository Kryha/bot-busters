import {
  Button,
  type ButtonProps,
  Stack,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { styles } from "./styles";
import { type FC } from "react";

type Props = Pick<ButtonProps, "onClick"> & Omit<TextFieldProps, "onClick">;

export const InputField: FC<Props> = ({ onClick, ...rest }) => {
  return (
    <Stack sx={styles.wrapper}>
      <TextField
        placeholder="Type your message"
        InputProps={{ sx: { flexGrow: 1 } }}
        sx={styles.input}
        {...rest}
      />
      <Button variant="contained" onClick={onClick}>
        SEND
      </Button>
    </Stack>
  );
};
