import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  type ReCaptchaContextProps,
  useReCaptchaContext,
} from "~/containers/recaptcha-provider/recaptcha-provider";

export interface useReCaptchaProps extends ReCaptchaContextProps {
  executeRecaptcha: (action: string) => Promise<string>;
}

/** React Hook to generate ReCaptcha token
 * @example
 * const { executeRecaptcha } = useReCaptcha()
 */
export const useRecaptcha = (reCaptchaKey?: string): useReCaptchaProps => {
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

export const getRecaptchaScriptSrc = ({
  reCaptchaKey,
  language,
  useRecaptchaNet = false,
  useEnterprise = false,
}: {
  reCaptchaKey?: string;
  language?: string;
  useRecaptchaNet?: boolean;
  useEnterprise?: boolean;
} = {}): string => {
  const hostName = useRecaptchaNet ? "recaptcha.net" : "google.com";
  const script = useEnterprise ? "enterprise.js" : "api.js";

  let src = `https://www.${hostName}/recaptcha/${script}?`;
  if (reCaptchaKey) src += `render=${reCaptchaKey}`;
  if (language) src += `&hl=${language}`;

  return src;
};

// https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
