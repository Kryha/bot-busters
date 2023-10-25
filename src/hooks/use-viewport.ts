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
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { width: windowSize.width, height: windowSize.height };
};
