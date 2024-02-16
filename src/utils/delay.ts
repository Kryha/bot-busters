// useDelayedVisibility.tsx
import { useCallback, useEffect, useState } from "react";

export const useDelayedVisibility = (delay = 500) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | number | null>(
    null,
  );

  const show = useCallback(() => {
    if (timeoutId) clearTimeout(timeoutId as NodeJS.Timeout);
    setIsVisible(true);
  }, [timeoutId]);

  const hide = useCallback(() => {
    if (timeoutId) clearTimeout(timeoutId as NodeJS.Timeout);
    const id = setTimeout(() => setIsVisible(false), delay);
    setTimeoutId(id);
  }, [delay, timeoutId]);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId as NodeJS.Timeout);
    };
  }, [timeoutId]);

  return { isVisible, show, hide };
};
