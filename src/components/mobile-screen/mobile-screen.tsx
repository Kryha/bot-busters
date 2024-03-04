import { Stack, Typography } from "@mui/material";
import { text } from "~/assets/text/index.js";
import { BotBustersIcon } from "~/assets/icons/index.js";
import Image from "next/image";
import MobileScreenImage from "~/assets/images/mobile-screen.png";
import { styles } from "./styles.js";

export const MobileScreen = () => {
  return (
    <Stack sx={styles.container}>
      <Typography variant="body1" sx={styles.aleoSystems}>
        {text.homepage.aleoSystems}
      </Typography>
      <Stack sx={styles.content}>
        <BotBustersIcon />
        <Typography variant="body1" sx={styles.text}>
          {text.general.mobileNotSupported}
        </Typography>
        <Image src={MobileScreenImage} alt="Mobile Screen" />
      </Stack>
    </Stack>
  );
};
