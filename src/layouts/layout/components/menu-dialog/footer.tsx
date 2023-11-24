import { type FC } from "react";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

import { text } from "~/assets/text/index.js";
import { pages } from "~/utils/router.js";

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
      <Stack sx={styles.group}>
        <Typography variant="h4" color="common.black" sx={styles.textButton}>
          {text.general.aleoSystems}
        </Typography>
        <Typography
          variant="h4"
          color="common.black"
          onClick={() => handleNavigation(pages.privacy)}
          sx={styles.textButton}
        >
          {text.general.privacy}
        </Typography>
        <Typography variant="h4" color="common.black" sx={styles.textButton}>
          {text.general.cookies}
        </Typography>
      </Stack>
      <Stack sx={styles.group}>
        <Typography
          variant="h4"
          color="common.black"
          onClick={() => handleNavigation(pages.support)}
          sx={styles.textButton}
        >
          {text.general.support}
        </Typography>
        <Typography variant="h4" color="common.black" sx={styles.textButton}>
          {text.general.discord}
        </Typography>
        <Link href={text.general.aleoWebsite} target="_blank">
          <Typography variant="h4" color="common.black" sx={styles.textButton}>
            {text.general.aleoOrg}
          </Typography>
        </Link>
        <Typography variant="h4" color="common.black" sx={styles.textButton}>
          {text.general.zPass}
        </Typography>
      </Stack>
    </Stack>
  );
};
