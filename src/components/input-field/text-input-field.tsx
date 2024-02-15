import {
  Stack,
  type SxProps,
  TextField,
  type TextFieldProps,
  Typography,
} from "@mui/material";
import { type FC } from "react";
import { text } from "~/assets/text/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";
import { styles } from "./styles.js";

type TextInputFieldProps = TextFieldProps & {
  heading?: string;
  validationError?: string;
  container?: SxProps;
};

export const TextInputField: FC<TextInputFieldProps> = ({
  disabled,
  placeholder,
  heading,
  multiline,
  fullWidth,
  validationError,
  container,
  ...rest
}) => {
  return (
    <Stack sx={{ ...styles.wrapperTextField, ...container }}>
      <Typography variant="body1">{heading}</Typography>
      <TextField
        placeholder={placeholder}
        InputProps={{ sx: styles.textInputFieldProps }}
        sx={{
          ...(validationError
            ? styles.textInputFieldError
            : styles.textInputField),
        }}
        disabled={disabled}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={14}
        {...rest}
      />
      <Typography variant="body1" sx={styles.errorText}>
        {validationError}
      </Typography>
    </Stack>
  );
};

export const UsernameInputField: FC<TextInputFieldProps> = ({
  onClick,
  disabled,
  validationError,
  ...rest
}) => {
  return (
    <Stack>
      <Stack
        sx={{
          ...(validationError
            ? styles.usernameWrapperError
            : styles.usernameWrapper),
        }}
      >
        <TextField
          aria-label="chat-input"
          placeholder={text.chat.inputFieldPlaceholder}
          InputProps={{ sx: styles.inputFieldProps }}
          sx={{
            ...(validationError
              ? styles.usernameInputFieldError
              : styles.usernameInputField),
          }}
          disabled={disabled}
          fullWidth
          {...rest}
        />
        <PrimaryButton
          onClick={onClick}
          aria-label={"send-button"}
          disabled={!!validationError}
          sx={{ "&:disabled": { border: "none" } }}
        >
          {text.general.confirm}
        </PrimaryButton>
      </Stack>
      <Typography variant="body1" sx={styles.errorText}>
        {validationError}
      </Typography>
    </Stack>
  );
};
