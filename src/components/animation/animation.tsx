import React, { type FC, useState } from "react";
import { DEFAULT_SPRITE_SCALE } from "~/components/animation/animation-constants";
import { styles } from "~/components/animation/dancing-girl/styles";

interface Props {
  id: string;
  xlinkHref: string;
  animatedSymbolRef?: React.RefObject<SVGUseElement>;
  width?: number;
  height?: number;
  scale: number;
}
export const Animation: FC<Props> = ({
  id,
  xlinkHref,
  animatedSymbolRef,
  scale,
}) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const onClick = () => {
    setClicked(!clicked);
  };
  const onMouseEnter = () => {
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  const hoverScale = DEFAULT_SPRITE_SCALE * scale;

  return (
    <svg
      style={{
        ...styles.sprite,
        transform: hovered ? `scale(${hoverScale})` : `scale(${scale})`,
        border: hovered ? "1px solid red" : "",
      }}
      key={id}
      aria-labelledby={id}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <use xlinkHref={xlinkHref} ref={animatedSymbolRef} />
    </svg>
  );
};
