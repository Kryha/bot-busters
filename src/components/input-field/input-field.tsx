import {
  Stack,
  TextField,
  type ButtonProps,
  type TextFieldProps,
} from "@mui/material";
import { type FC } from "react";
import { text } from "~/assets/text/index.js";
import { SendButton } from "~/components/send-button/index.js";
import { styles } from "./styles.js";

type Props = Pick<ButtonProps, "onClick"> &
  Omit<TextFieldProps, "onClick"> & {
    validationError?: string;
  };

export const InputField: FC<Props> = ({
  onClick,
  disabled,
  validationError,
  ...rest
}) => {
  return (
    <Stack sx={{ ...(validationError ? styles.wrapperError : styles.wrapper) }}>
      <TextField
        aria-label="chat-input"
        placeholder={text.chat.inputFieldPlaceholder}
        InputProps={{ sx: styles.inputFieldProps }}
        sx={{
          ...(validationError ? styles.inputFieldError : styles.inputField),
        }}
        disabled={disabled}
        helperText={validationError}
        fullWidth
        multiline
        {...rest}
        rows={3}
      />
      <SendButton
        onClick={onClick}
        aria-label={"send-button"}
        disabled={!!validationError}
      >
        {text.chat.send}
      </SendButton>
    </Stack>
  );
};
