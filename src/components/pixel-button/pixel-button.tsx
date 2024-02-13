import { type FC } from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/base";
import { usePlaySFX } from "~/hooks/sounds.js";
import { SelectIcon } from "~/assets/icons/index.js";
import { theme } from "~/styles/theme.js";

interface Props extends React.ComponentProps<typeof Button> {
  text: string;
}

const PixelButtonStyle = styled(Button)({
  background: "none",
  border: "none",
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  textAlign: "left",
  gap: 24,
  fontSize: "72px",
  lineHeight: "normal",
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.h2.fontFamily,
  textTransform: "uppercase",
  "& > svg": {
    "& > path": {
      fill: theme.palette.common.black,
      stroke: theme.palette.common.black,
    },
  },
  "&:hover": {
    color: theme.palette.primary.main,
    "& > svg": {
      "& > path": {
        fill: theme.palette.primary.main,
        stroke: theme.palette.primary.main,
      },
    },
  },
  "&:active": {
    color: theme.palette.primary.main,
    "& > svg": {
      "& > path": {
        fill: theme.palette.primary.main,
        stroke: theme.palette.primary.main,
      },
    },
  },
});

export const PixelButton: FC<Props> = ({ text, ...props }) => {
  const playSfx = usePlaySFX();
  const handleClick = async () => {
    try {
      await playSfx("./sounds/BB_UI_Nav_Click.mp3");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PixelButtonStyle {...props} onClick={handleClick}>
      <SelectIcon />
      {text}
    </PixelButtonStyle>
  );
};
