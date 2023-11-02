import { Stack, Typography } from "@mui/material";
import { styles } from "./styles";
import { contactListData } from "@/constants";
import { text } from "../../text";
import { type FC } from "react";
import { VoteUser } from "../vote-user";

interface Props {
  isFinished?: boolean;
}

export const UsernameOthers: FC<Props> = ({ isFinished = true }) => {
  return (
    <Stack sx={styles.container}>
      <Typography variant="body1">{text.otherParticipants}</Typography>
      <Stack sx={styles.list}>
        {contactListData.map((_, index) => (
          <VoteUser isFinished={isFinished} key={index} id={String(index)} />
        ))}
      </Stack>
    </Stack>
  );
};
