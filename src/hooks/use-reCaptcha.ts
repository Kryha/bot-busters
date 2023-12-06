"use client";

import { useCallback, useRef } from "react";
import {
  type ReCaptchaContextProps,
  useReCaptchaContext,
} from "~/containers/reCaptcha";
import { useIsomorphicLayoutEffect } from "~/containers/reCaptcha/utils";

export interface useReCaptchaProps extends ReCaptchaContextProps {
  executeRecaptcha: (action: string) => Promise<string>;
}

/** React Hook to generate ReCaptcha token
 * @example
 * const { executeRecaptcha } = useReCaptcha()
 */
const useReCaptcha = (reCaptchaKey?: string): useReCaptchaProps => {
  const {
    grecaptcha,
    loaded,
    reCaptchaKey: contextReCaptchaKey,
    ...contextProps
  } = useReCaptchaContext();

  const siteKey = reCaptchaKey ?? contextReCaptchaKey;

  // Create a ref that stores 'grecaptcha.execute' method to prevent rerenders
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const executeCaptchaRef = useRef(grecaptcha?.execute);

  useIsomorphicLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    executeCaptchaRef.current = grecaptcha?.execute;
    // eslint-disable-next-line @typescript-eslint/unbound-method
  }, [loaded, grecaptcha?.execute]);

  const executeRecaptcha = useCallback(
    async (action: string) => {
      if (typeof executeCaptchaRef.current !== "function") {
        throw new Error("Recaptcha has not been loaded");
      }

      return await executeCaptchaRef.current(siteKey!, { action });
    },
    [siteKey],
  );

  return {
    ...contextProps,
    grecaptcha,
    loaded,
    reCaptchaKey: siteKey,
    executeRecaptcha,
  };
};

export { useReCaptcha };
