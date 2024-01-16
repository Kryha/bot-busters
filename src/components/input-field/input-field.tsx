import React, { type FC } from "react";
import {
  type ButtonProps,
  Stack,
  TextField,
  type TextFieldProps,
} from "@mui/material";

import { text } from "~/assets/text/index.js";

import { styles } from "./styles.js";
import { PrimaryButton } from "~/components/primary-button";

type Props = Pick<ButtonProps, "onClick"> & Omit<TextFieldProps, "onClick">;

export const InputField: FC<Props> = ({ onClick, disabled, ...rest }) => {
  return (
    <Stack sx={styles.wrapper}>
      <TextField
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
