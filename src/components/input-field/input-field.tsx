import { type FC } from "react";
import {
  type ButtonProps,
  Stack,
  TextField,
  type TextFieldProps,
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
