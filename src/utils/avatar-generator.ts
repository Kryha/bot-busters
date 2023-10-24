import { useMemo } from "react";
import { minidenticon } from "minidenticons";

export const MinidenticonImg = (username: string) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(username, 90)),
    [username]
  );
  return svgURI;
};
