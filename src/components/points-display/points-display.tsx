import { type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";

interface Props {
  title: string;
  info: string;
  isCentered?: boolean;
}

export const PointsDisplay: FC<Props> = ({
  title,
  info,
  isCentered = false,
}) => {
  return (
    // TODO: Add color to theme
    <Stack sx={styles.pointsContainer(isCentered)}>
      <Typography variant="overline" color="#424242">
        {title}
      </Typography>
      <Typography variant="h5" color="#424242">
        {info}
      </Typography>
    </Stack>
  );
};
