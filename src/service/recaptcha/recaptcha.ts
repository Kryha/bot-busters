import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { type IReCaptcha } from "~/types/recaptcha";
import { env } from "~/env.mjs";
import { type ScriptProps } from "next/script";

/** React Hook to generate ReCaptcha token
 * @example
 * const { executeRecaptcha } = useReCaptcha()
 */
export const useRecaptcha = () => {
  const { value, onError, onLoad, src, strategy, id, ...props } =
    useSetupRecaptcha({});

  const { grecaptcha, loaded, reCaptchaKey } = value;
  const siteKey = reCaptchaKey;

  // Create a ref that stores 'grecaptcha.execute' method to prevent rerenders
  const executeCaptchaRef = useRef(grecaptcha?.execute);

  useIsomorphicLayoutEffect(() => {
    executeCaptchaRef.current = grecaptcha?.execute;
  }, [loaded, grecaptcha?.execute]);

  const executeRecaptcha = useCallback(
    async (action: string) => {
      if (typeof executeCaptchaRef.current !== "function") {
        throw new Error("Recaptcha has not been loaded");
      }

      return await executeCaptchaRef.current(siteKey, { action });
    },
    [siteKey],
  );

  return {
    ...props,
    grecaptcha,
    loaded,
    reCaptchaKey: siteKey,
    executeRecaptcha,
    onLoad,
    onError,
    src,
    strategy,
    id,
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

interface RecaptchaProps extends Partial<Omit<ScriptProps, "onLoad">> {
  language?: string;
  onLoad?: (grecaptcha: IReCaptcha, e: undefined) => void;
}

export const useSetupRecaptcha = ({
  id = "google-recaptcha-v3",
  strategy = "beforeInteractive",
  language,
  src: passedSrc,
  onLoad: passedOnLoad,
  onError: passedOnError,
  ...props
}: RecaptchaProps) => {
  const [grecaptcha, setGreCaptcha] = useState<IReCaptcha | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const mounted = useRef(false);

  const reCaptchaKey = env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const useEnterprise = false;
  const useRecaptchaNet = false;

  const src =
    passedSrc ??
    getRecaptchaScriptSrc({
      reCaptchaKey,
      language,
      useRecaptchaNet,
      useEnterprise,
    });

  useEffect(() => {
    if (mounted.current) {
      setLoaded(false);
      setError(false);
    }
    mounted.current = true;
  }, [src]);

  // Handle script load
  const onLoad = useCallback(
    (e?: never) => {
      const grecaptcha = useEnterprise
        ? window?.grecaptcha?.enterprise
        : window?.grecaptcha;

      if (grecaptcha) {
        grecaptcha.ready(() => {
          setGreCaptcha(grecaptcha);
          setLoaded(true);
          passedOnLoad?.(grecaptcha, e);
        });
      }
    },
    [passedOnLoad, useEnterprise],
  );

  // Run 'onLoad' function once just in case if grecaptcha is already globally available in window
  useEffect(() => onLoad(), [onLoad]);

  // Handle script error
  const onError = useCallback(
    (e: ErrorEvent) => {
      setError(true);
      passedOnError?.(e);
    },
    [passedOnError],
  );

  // Prevent unnecessary rerenders
  const value = useMemo(
    () => ({ reCaptchaKey, grecaptcha, loaded, error }),
    [reCaptchaKey, grecaptcha, loaded, error],
  );

  return { id, src, strategy, onLoad, onError, ...props, value };
};
