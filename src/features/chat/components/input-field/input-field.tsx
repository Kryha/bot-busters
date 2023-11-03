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
import { z } from "zod";
import { useRouter } from "next/router";

type Props = Pick<ButtonProps, "onClick"> &
  Omit<TextFieldProps, "onClick"> & {
    isFinished: boolean;
  };

export const InputField: FC<Props> = ({ onClick, isFinished, ...rest }) => {
  const { query } = useRouter();
  // TODO: Fix router
  const parse = z.string().safeParse(query.gameState);
  const gameState = parse.success ? parse.data : "";
  const isDecision = gameState === "Decision";

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
            disabled={isDecision}
            {...rest}
          />
          <Button variant="contained" onClick={onClick} disabled={isDecision}>
            {text.send}
          </Button>
        </>
      )}
    </Stack>
  );
};
