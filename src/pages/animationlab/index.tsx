import { Box, Typography } from "@mui/material";
import { type FC } from "react";
import { text } from "@/assets/text";
import { common } from "@mui/material/colors";
import { useControls } from "leva";
import { DancingGirlSpriteSheet } from "@/features/animation/dancing-girl/dancing-girl-spritesheet";
import { SpriteController } from "@/features/animation/controller/sprite-controller";

const styles = {
  title: {
    display: "flex",
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  lab: {
    background: "#000000",
    height: "100vh",
    width: "100%",
  },
  spriteRow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
const AnimationLab: FC = () => {
  const [{ rowCount }, set] = useControls(() => ({
    rowCount: {
      label: "Sprite Rows",
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    totalSprites: {
      label: "Total Sprites",
      value: 14,
      editable: false,
    },
  }));

  const renderSprites = () => {
    const sprites = [];
    for (let i = 0; i < rowCount; i++) {
      sprites.push(<DancingGirlSpriteSheet key={i} />);
      set({ totalSprites: rowCount * 14 });
    }
    return sprites;
  };

  return (
    <Box component="div" sx={styles.lab}>
      <Typography sx={styles.title} color={common.white} variant="h5">
        {text.animationLab.welcome}
      </Typography>
      <Box sx={styles.spriteRow}>{renderSprites()}</Box>
      <SpriteController />
    </Box>
  );
};

export default AnimationLab;
