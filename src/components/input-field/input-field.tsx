import React, { type FC } from "react";
import {
  Button,
  type ButtonProps,
  Stack,
  TextField,
  type TextFieldProps,
  Typography,
} from "@mui/material";

import { text } from "~/assets/text/index.js";

import { styles } from "./styles.js";

type Props = Pick<ButtonProps, "onClick"> & Omit<TextFieldProps, "onClick">;

export const InputField: FC<Props> = ({ onClick, disabled, ...rest }) => {
  return (
    <Stack sx={styles.wrapper(disabled)}>
      {disabled ? (
        <Typography variant="body1" color="common.black" sx={styles.text}>
          {text.chat.chatEnded}
        </Typography>
      ) : (
        <>
          <TextField
            placeholder={text.chat.inputFieldPlaceholder}
            InputProps={{ sx: styles.inputFieldProps }}
            sx={styles.inputField}
            disabled={disabled}
            {...rest}
          />
          <Button
            variant="contained"
            onClick={onClick}
            aria-label={"send-button"}
            disabled={disabled}
          >
            {text.chat.send}
          </Button>
        </>
      )}
    </Stack>
  );
};
