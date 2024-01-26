import { type FC } from "react";
import {
  Stack,
  Typography,
  type SxProps,
  Select,
  type SelectProps,
  MenuItem,
} from "@mui/material";

import { styles } from "./styles.js";

type SelectInputFieldProps = SelectProps & {
  heading: string;
  placeholder?: string;
  container?: SxProps;
  options: string[];
};

export const SelectField: FC<SelectInputFieldProps> = ({
  options,
  disabled,
  onChange,
  placeholder,
  value,
  heading,
  multiline,
  fullWidth,
  container,
}) => {
  return (
    <Stack sx={{ ...styles.container, ...container }}>
      <Typography variant="body1">{heading}</Typography>
      <Select
        onChange={onChange}
        value={value}
        disabled={disabled}
        fullWidth={fullWidth}
        multiline={multiline}
        sx={styles.selectInputField}
        displayEmpty
      >
        <MenuItem value="">
          <em style={styles.disabledText}>{placeholder}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option} sx={styles.option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};
