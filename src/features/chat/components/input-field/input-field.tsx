import {
  Button,
  type ButtonProps,
  Stack,
  TextField,
  type TextFieldProps,
  Typography,
} from "@mui/material";
import { styles } from "./styles";
import { type FC } from "react";
import { text } from "../../text";

type Props = Pick<ButtonProps, "onClick"> &
  Omit<TextFieldProps, "onClick"> & {
    isFinished: boolean;
  };

export const InputField: FC<Props> = ({ onClick, isFinished, ...rest }) => {
  return (
    <Stack sx={styles.wrapper(isFinished)}>
      {isFinished ? (
        <Typography variant="body1" color="customGrey.main" sx={styles.text}>
          {text.chatEnded}
        </Typography>
      ) : (
        <>
          <TextField
            placeholder={text.inputFieldPlaceholder}
            InputProps={{ sx: styles.inputFieldProps }}
            sx={styles.inputField}
            {...rest}
          />
          <Button variant="contained" onClick={onClick}>
            {text.send}
          </Button>
        </>
      )}
    </Stack>
  );
};
