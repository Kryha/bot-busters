import { styled } from "@mui/material/styles";
import { Button } from "@mui/base";
import { type FC } from "react";
import { SoundOnIcon } from "~/assets/icons/index.js";
import { theme } from "~/styles/theme.js";

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
    fill:
      audio > 0 ? theme.palette.primary.main : theme.palette.customGrey.main,
    stroke:
      audio > 0 ? theme.palette.primary.main : theme.palette.customGrey.main,
  },
}));

export const SoundButton: FC<Props> = ({ masterVolume, ...props }) => {
  return (
    <SoundButtonStyle audio={masterVolume} {...props}>
      <SoundOnIcon />
    </SoundButtonStyle>
  );
};
