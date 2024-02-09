import { Stack, TextField, type TextFieldProps } from "@mui/material";
import { type FC } from "react";
import { text } from "~/assets/text/index.js";
import { SendButton } from "~/components/send-button/index.js";
import { styles } from "./styles.js";

type Props = TextFieldProps & {
  validationError?: string;
  sendMessage: (event: { target: { value: string } }) => void;
};

export const InputField: FC<Props> = ({
  sendMessage,
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
        onClick={sendMessage}
        aria-label={"send-button"}
        disabled={!!validationError}
      >
        {text.chat.send}
      </SendButton>
    </Stack>
  );
};
