import { type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";

interface Props {
  title: string;
  info: string;
  isCentered?: boolean;
}

export const StatsDisplay: FC<Props> = ({
  title,
  info,
  isCentered = false,
}) => {
  return (
    <Stack sx={styles.pointsContainer(isCentered)}>
      <Typography variant="overline" color="common.black">
        {title}
      </Typography>
      <Typography variant="body1" color="common.white" sx={styles.info}>
        {info}
      </Typography>
    </Stack>
  );
};
