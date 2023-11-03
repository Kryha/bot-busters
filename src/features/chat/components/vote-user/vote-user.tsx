import {
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  type StackProps,
} from "@mui/material";
import { styles } from "./styles";
import { text } from "../../text";
import { type FC, useState } from "react";
import { type DecisionType, decisionTypeSchema } from "@/types";
import { User } from "../user";
import { COLORS } from "../../constants";

interface Props extends StackProps {
  onVote: () => void;
}

export const VoteUser: FC<Props> = ({ id, onVote }) => {
  const color = COLORS[Number(id)];
  const [value, setValue] = useState<DecisionType | null>(null);

  const handleAlignment = (
    _: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    const parsed = decisionTypeSchema.safeParse(newValue);
    if (!parsed.success) return;

    setValue(parsed.data);
    onVote();
  };

  return (
    <ToggleButtonGroup
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
          <User color={color} />
        </Stack>
        <Divider />
      </Stack>
      <ToggleButton value="human">
        <Typography>{text.human}</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
