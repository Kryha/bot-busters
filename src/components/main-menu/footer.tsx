import { Stack, Typography } from "@mui/material";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { type FC } from "react";

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
      <Typography
        variant="h4"
        onClick={() => handleNavigation(pages.support)}
        sx={styles.textButton}
      >
        {text.general.support}
      </Typography>
      <Typography
        variant="h4"
        sx={styles.textButton}
        onClick={() => handleNavigation(pages.termsAndConditions)}
      >
        {text.general.termsAndConditions}
      </Typography>
      <Link
        href={text.general.aleoWebsite}
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <Typography variant="h4" sx={styles.textButton}>
          {text.general.aleoOrg}
        </Typography>
      </Link>
      <Link
        href={text.general.zpassWebsite}
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <Typography variant="h4" sx={styles.textButton}>
          {text.general.zPass}
        </Typography>
      </Link>
      <Link
        href={text.general.obscuraWebsite}
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <Typography variant="h4" sx={styles.textButton}>
          {text.general.obscura}
        </Typography>
      </Link>
    </Stack>
  );
};
