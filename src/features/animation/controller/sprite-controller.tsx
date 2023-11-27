import React from "react";
import { Leva, useControls } from "leva";
import { FpsView } from "react-fps";

export const styles = {
  controller: {
    position: "absolute",
  },
};

export const SpriteController: React.FC = () => {
  const { enabled } = useControls({
    enabled: {
      label: "Enable Performance (FPS) Monitoring",
      value: true,
    },
  });

  return (
    <div>
      <Leva
        titleBar={{ title: "Sprite Controller" }}
        collapsed={false}
        oneLineLabels={true}
        hideCopyButton={true}
      />
      {enabled && <FpsView />}
    </div>
  );
};
