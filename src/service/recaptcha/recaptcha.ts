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
import { isClient } from "~/utils/client.js";

/** React Hook to generate ReCaptcha token
 * @example
 * const { executeRecaptcha } = useReCaptcha()
 */
export const useRecaptcha = () => {
  const { scriptProps, value, ...props } = useSetupRecaptcha({});

  const { grecaptcha, loaded, recaptchaKey } = value;

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

      return await executeCaptchaRef.current(recaptchaKey, action);
    },
    [recaptchaKey],
  );

  return {
    ...props,
    grecaptcha,
    loaded,
    recaptchaKey,
    executeRecaptcha,
    scriptProps,
  };
};

type Captcha = "recaptcha.net" | "google.com";

interface RecaptchaSrcProps {
  recaptchaKey: string;
  language?: string;
  useRecaptchaNet?: boolean;
  useEnterprise?: boolean;
}

export const getRecaptchaScriptSrc = ({
  recaptchaKey,
  language,
  useRecaptchaNet = false,
  useEnterprise = false,
}: RecaptchaSrcProps): string => {
  const hostName: Captcha = useRecaptchaNet ? "recaptcha.net" : "google.com";
  const script = useEnterprise ? "enterprise.js" : "api.js";

  let src = `https://www.${hostName}/recaptcha/${script}?`;

  if (recaptchaKey) {
    src += `render=${recaptchaKey}`;
  }

  if (language) {
    src += `&hl=${language}`;
  }

  return src;
};

// https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
export const useIsomorphicLayoutEffect = !isClient()
  ? useLayoutEffect
  : useEffect;

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
  const [grecaptcha, setGreCaptcha] = useState<IReCaptcha>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const mounted = useRef(false);

  const recaptchaKey = env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const useEnterprise = false;
  const useRecaptchaNet = false;

  const src =
    passedSrc ??
    getRecaptchaScriptSrc({
      recaptchaKey,
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
    () => ({ recaptchaKey, grecaptcha, loaded, error }),
    [recaptchaKey, grecaptcha, loaded, error],
  );

  const scriptProps = useMemo(
    () => ({ id, src, strategy, onLoad, onError }),
    [id, src, strategy, onLoad, onError],
  );

  return { scriptProps, ...props, value };
};
