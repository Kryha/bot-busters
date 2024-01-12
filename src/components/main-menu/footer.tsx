import { type FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link.js";
import { useRouter } from "next/router.js";

import { text } from "~/assets/text/index.js";
import { pages } from "~/router.js";

import { styles } from "./styles.js";

interface Props {
  handleClose: () => void;
}

export const Footer: FC<Props> = ({ handleClose }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    void router.push(path);
    handleClose();
  };

  return (
    <Stack sx={styles.footer}>
      <Box component={"div"} sx={styles.group}>
        <Typography
          variant="h4"
          onClick={() => handleNavigation(pages.support)}
          sx={styles.textButton}
        >
          {text.general.support}
        </Typography>
        <Typography variant="h4" sx={styles.textButton}>
          {text.general.discord}
        </Typography>
        <Link href={text.general.aleoWebsite} target="_blank">
          <Typography variant="h4" sx={styles.textButton}>
            {text.general.aleoOrg}
          </Typography>
        </Link>
        <Typography variant="h4" sx={styles.textButton}>
          {text.general.zPass}
        </Typography>
        <Typography
          variant="h4"
          onClick={() => handleNavigation(pages.privacy)}
          sx={styles.textButton}
        >
          {text.general.legal}
        </Typography>
      </Box>
    </Stack>
  );
};
