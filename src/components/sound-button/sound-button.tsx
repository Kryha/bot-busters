import { styled } from "@mui/material/styles";
import { Button } from "@mui/base";
import { type FC } from "react";
import { SoundOnIcon } from "~/assets/icons/index.js";
import { AUDIO_OFF } from "~/constants/main.js";

interface Props extends React.ComponentProps<typeof Button> {
  text?: string;
  masterVolume: number;
}

export const SoundButtonStyle = styled(Button)(({ audio }) => ({
  background: "none",
  border: "none",
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  textAlign: "left",
  padding: "0 !important",
  "& > svg > g > path": {
    fill: audio ? "#5CFF00" : "transparent",
    stroke: audio ? "#5CFF00" : "transparent",
  },
}));

export const SoundButton: FC<Props> = ({ masterVolume, ...props }) => {
  const audio = masterVolume !== AUDIO_OFF;

  return (
    <SoundButtonStyle audio={audio} {...props}>
      <SoundOnIcon />
    </SoundButtonStyle>
  );
};
