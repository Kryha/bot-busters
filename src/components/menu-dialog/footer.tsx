import { Stack, Typography } from "@mui/material";
import { type FC } from "react";
import { styles } from "./styles";
import { text } from "@/assets/text";

export const Footer: FC = () => {
  return (
    <Stack sx={styles.footer}>
      <Stack sx={styles.group}>
        <Typography variant="h4" color="common.black">
          {text.general.aleoSystems}
        </Typography>
        <Typography variant="h4" color="common.black">
          {text.general.privacy}
        </Typography>
        <Typography variant="h4" color="common.black">
          {text.general.cookies}
        </Typography>
      </Stack>
      <Stack sx={styles.group}>
        <Typography variant="h4" color="common.black">
          {text.general.support}
        </Typography>
        <Typography variant="h4" color="common.black">
          {text.general.discord}
        </Typography>
        <Typography variant="h4" color="common.black">
          {text.general.aleoOrg}
        </Typography>
        <Typography variant="h4" color="common.black">
          {text.general.zPass}
        </Typography>
      </Stack>
    </Stack>
  );
};
