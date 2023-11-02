import {
  Button,
  type ButtonProps,
  Stack,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { styles } from "./styles";
import { type FC } from "react";
import { text } from "../../text";
import { z } from "zod";
import { useRouter } from "next/router";

type Props = Pick<ButtonProps, "onClick"> & Omit<TextFieldProps, "onClick">;

export const InputField: FC<Props> = ({ onClick, ...rest }) => {
  const { query } = useRouter();
  // TODO: Fix router
  const parse = z.string().safeParse(query.gameState);
  const gameState = parse.success ? parse.data : "";
  const isDecision = gameState === "Decision";

  return (
    <Stack sx={styles.wrapper}>
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
    </Stack>
  );
};
