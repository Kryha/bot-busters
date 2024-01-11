import { type FC, useEffect } from "react";
import { type StackProps } from "@mui/material";
import { useSession } from "next-auth/react";

import {
  isAnonymousSession,
  missingUsername,
  isVerifiedSession,
} from "~/utils/session.js";
import { useRouter } from "next/router.js";
import { pages } from "~/router.js";

export const CheckVerifiedSessionWrapper: FC<StackProps> = ({ children }) => {
  const { data: sessionData } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (
      !sessionData ||
      isVerifiedSession(sessionData) ||
      isAnonymousSession(sessionData)
    )
      return;
    if (missingUsername(sessionData)) void push(pages.usernameSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData]);

  return <>{children}</>;
};
