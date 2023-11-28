import { Box, Typography } from "@mui/material";
import { type FC, useMemo } from "react";
import { common } from "@mui/material/colors";
import { useControls } from "leva";
import { AnimationController } from "~/components/animation-controller/animation-controller";
import { DancingGirlSpriteSheet } from "~/components/animation/dancing-girl/dancing-girl-spritesheet";
import { animationLab } from "~/components/animation/animation-constants";

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

  const renderSprites = useMemo(() => {
    const sprites = [];
    for (let i = 0; i < rowCount; i++) {
      sprites.push(<DancingGirlSpriteSheet key={i} />);
      set({ totalSprites: rowCount * 14 });
    }
    return sprites;
  }, [rowCount, set]);

  return (
    <Box component="div" sx={styles.lab}>
      <Typography sx={styles.title} color={common.white} variant="h5">
        {animationLab.welcome}
      </Typography>
      <Box sx={styles.spriteRow}>{renderSprites}</Box>
      <AnimationController />
    </Box>
  );
};

export default AnimationLab;
