import { Box, Slide } from "@mui/material";
import { AnimationPlayer } from "~/components/animation/index.js";
import { HomePageOutro } from "~/assets/animations/index.js";
import { styles } from "./styles.js";

export const HomePageOutroAnimation = () => {
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Box component={"div"} sx={styles.container}>
        <AnimationPlayer
          animationData={HomePageOutro}
          play
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    </Slide>
  );
};
