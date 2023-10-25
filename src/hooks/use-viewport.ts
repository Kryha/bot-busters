import { isClient } from "@/utils/client";
import { useEffect, useState } from "react";

interface ViewportProps {
  width?: number;
  height?: number;
}

export const useViewport = () => {
  const [windowSize, setWindowSize] = useState<ViewportProps>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (!isClient()) return;
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (isClient()) window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      if (isClient()) return window.removeEventListener("resize", handleResize);
    };
  }, []);
  return { width: windowSize.width, height: windowSize.height };
};
