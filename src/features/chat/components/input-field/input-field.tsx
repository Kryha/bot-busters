import {
  Button,
  type ButtonProps,
  Stack,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { styles } from "./styles";
import { type FC } from "react";
import { text } from "../../text";

type Props = Pick<ButtonProps, "onClick"> & Omit<TextFieldProps, "onClick">;

export const InputField: FC<Props> = ({ onClick, ...rest }) => {
  return (
    <Stack sx={styles.wrapper}>
      <TextField
        placeholder={text.inputFieldPlaceholder}
        InputProps={{ sx: styles.inputFieldProps }}
        sx={styles.inputField}
        {...rest}
      />
      <Button variant="contained" onClick={onClick}>
        {text.send}
      </Button>
    </Stack>
  );
};
