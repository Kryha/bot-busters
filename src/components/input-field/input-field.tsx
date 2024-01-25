import { type FC } from "react";
import {
  type ButtonProps,
  Stack,
  TextField,
  type TextFieldProps,
  Typography,
  type SxProps,
} from "@mui/material";

import { PrimaryButton } from "~/components/primary-button/index.js";

import { text } from "~/assets/text/index.js";
import { styles } from "./styles.js";

type Props = Pick<ButtonProps, "onClick"> & Omit<TextFieldProps, "onClick">;

export const InputField: FC<Props> = ({ onClick, disabled, ...rest }) => {
  return (
    <Stack sx={styles.wrapper}>
      <TextField
        aria-label="chat-input"
        placeholder={text.chat.inputFieldPlaceholder}
        InputProps={{ sx: styles.inputFieldProps }}
        sx={styles.inputField}
        disabled={disabled}
        fullWidth
        multiline
        {...rest}
      />
      <PrimaryButton
        onClick={onClick}
        aria-label={"send-button"}
        disabled={disabled}
      >
        {text.chat.send}
      </PrimaryButton>
    </Stack>
  );
};

type TextInputFieldProps = TextFieldProps & {
  heading: string;
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
        {...rest}
      />
    </Stack>
  );
};
