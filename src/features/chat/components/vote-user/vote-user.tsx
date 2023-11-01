import {
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
  Typography,
} from "@mui/material";
import { styles } from "./styles";
import { Username } from "../username";
import { text } from "../../text";
import { type FC, useState } from "react";
import { COLORS } from "../../constants";

type Decision = "human" | "bot" | null;

interface VoteProps extends ToggleButtonGroupProps {
  isFinished?: boolean;
}

export const VoteUser: FC<VoteProps> = ({ isFinished, id }) => {
  const [value, setValue] = useState<Decision>(null);
  const color = COLORS[Number(id)];
  const handleAlignment = (
    _: React.MouseEvent<HTMLElement>,
    newValue: Decision
  ) => {
    setValue(newValue);
  };

  if (!isFinished) return <Username color={color} />;

  return (
    <ToggleButtonGroup
      id={id}
      value={value}
      exclusive
      onChange={handleAlignment}
      sx={styles.container}
      aria-label="Selected Items"
    >
      <ToggleButton value="bot">
        <Typography>{text.bot}</Typography>
      </ToggleButton>
      <Stack sx={styles.usernameContainer}>
        <Divider />
        <Stack sx={styles.username}>
          <Username color={color} />
        </Stack>
        <Divider />
      </Stack>
      <ToggleButton value="human">
        <Typography>{text.human}</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
