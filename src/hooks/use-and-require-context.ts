import { type Context, useContext, useMemo } from "react";

// TODO: send this to error boundary
export function useAndRequireContext<T>(
  context: Context<T | undefined>,
  objectName = "hook",
  providerName = "provider",
): T {
  const possiblyUndefinedContext = useContext(context);
  return useMemo(() => {
    if (possiblyUndefinedContext === undefined)
      throw new Error(
        `Attempt to use ${objectName} outside of ${providerName}`,
      );
    return possiblyUndefinedContext;
  }, [objectName, possiblyUndefinedContext, providerName]);
}
