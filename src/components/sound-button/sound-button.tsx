import { styled } from "@mui/material/styles";
import { Button } from "@mui/base";
import { type FC } from "react";
import { SoundOffIcon, SoundOnIcon } from "~/assets/icons/index.js";
import { AUDIO_OFF } from "~/constants/main.js";

interface Props extends React.ComponentProps<typeof Button> {
  text?: string;
  masterVolume: number;
}

export const SoundButtonStyle = styled(Button)({
  background: "none",
  border: "none",
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  textAlign: "left",
  padding: "0 !important",
});

export const SoundButton: FC<Props> = ({ masterVolume, ...props }) => {
  return (
    <SoundButtonStyle {...props}>
      {masterVolume === AUDIO_OFF ? <SoundOffIcon /> : <SoundOnIcon />}
    </SoundButtonStyle>
  );
};
