import {
  Button,
  type ButtonProps,
  Stack,
  TextField,
  type TextFieldProps,
  Typography,
} from "@mui/material";

import { styles } from "./styles.js";
import { type FC } from "react";
import { text } from "../../text.js";

type Props = Pick<ButtonProps, "onClick"> & Omit<TextFieldProps, "onClick">;

export const InputField: FC<Props> = ({ onClick, disabled, ...rest }) => {
  return (
    <Stack sx={styles.wrapper(disabled)}>
      {disabled ? (
        <Typography variant="body1" color="customGrey.main" sx={styles.text}>
          {text.chatEnded}
        </Typography>
      ) : (
        <>
          <TextField
            placeholder={text.inputFieldPlaceholder}
            InputProps={{ sx: styles.inputFieldProps }}
            sx={styles.inputField}
            disabled={disabled}
            {...rest}
          />
          <Button variant="contained" onClick={onClick} disabled={disabled}>
            {text.send}
          </Button>
        </>
      )}
    </Stack>
  );
};
