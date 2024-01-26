import { useRef, type FC, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useRouter } from "next/router.js";

import { api } from "~/utils/api.js";
import { RowCreateUsername } from "~/components/tables/components/index.js";

import { type LoginStage } from "./types.js";
import { LoginLoading } from "./login-loading.jsx";
import { pages } from "~/router.js";

interface UsernameSelectProps {
  address: string;
  signature: string;
  setLoginStage: (stage: LoginStage) => void;
}

// TODO: make component appearance according to the designs
export const UsernameSelect: FC<UsernameSelectProps> = ({
  address,
  signature,
  setLoginStage,
}) => {
  const router = useRouter();

  const verify = api.user.verify.useMutation();
  const merge = api.user.mergeScore.useMutation();

  const [isAskingUsername, setIsAskingUsername] = useState(false);

  const shouldMerge = useRef(true);

  useEffect(() => {
    const attemptMerge = async () => {
      if (!shouldMerge.current) return;
      shouldMerge.current = false;

      try {
        const res = await merge.mutateAsync({ address, signature });

        if (res.isUsernameSet) {
          setLoginStage("signIn");
        } else {
          setIsAskingUsername(true);
        }
      } catch (error) {
        // TODO: use a generic error page
        await router.push(pages.home);
      }
    };

    attemptMerge().catch((err) => console.error(err));
  }, [address, merge, router, setLoginStage, signature]);

  const handleVerification = async (username: string) => {
    try {
      await verify.mutateAsync({ username, signature, address });
      setLoginStage("signIn");
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAskingUsername) return <LoginLoading />;

  return (
    <Stack>
      <RowCreateUsername
        onSetUsername={handleVerification}
        error={verify.error?.message}
      />
    </Stack>
  );
};
