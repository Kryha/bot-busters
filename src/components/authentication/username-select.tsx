import { useRef, type FC, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router.js";
import { useErrorBoundary } from "react-error-boundary";

import { api } from "~/utils/api.js";
import { RowCreateUsername } from "~/components/tables/components/index.js";
import { text } from "~/assets/text/index.js";
import { PageLayout } from "~/containers/page-layout/index.js";

import { type LoginStage } from "./types.js";
import { LoginLoading } from "./login-loading.jsx";
import { styles } from "./styles.js";
import { errorMessage } from "~/constants/error-messages.js";

interface UsernameSelectProps {
  address: string;
  signature: string;
  setLoginStage: (stage: LoginStage) => void;
}

export const UsernameSelect: FC<UsernameSelectProps> = ({
  address,
  signature,
  setLoginStage,
}) => {
  const router = useRouter();
  const { showBoundary } = useErrorBoundary();

  const verify = api.user.verify.useMutation();
  const merge = api.user.mergeScore.useMutation();

  const [isAskingUsername, setIsAskingUsername] = useState(false);

  const shouldMerge = useRef(true);

  useEffect(() => {
    const attemptMerge = async () => {
      if (!shouldMerge.current) {
        console.error(errorMessage.account.shouldNotMerge);
        showBoundary(errorMessage.account.shouldNotMerge);
        return;
      }
      shouldMerge.current = false;

      try {
        const res = await merge.mutateAsync({ address, signature });

        if (res.isUsernameSet) {
          setLoginStage("signIn");
        } else {
          setIsAskingUsername(true);
        }
      } catch (e) {
        e instanceof Error
          ? console.error(`[${errorMessage.account.general}]: ${e.message}`, e)
          : console.error(e);

        showBoundary(errorMessage.account.general);
      }
    };

    attemptMerge().catch((e) => {
      e instanceof Error
        ? console.error(`[${errorMessage.support}]: ${e.message}`, e)
        : console.error(e);

      showBoundary(errorMessage.support);
    });
  }, [address, merge, router, setLoginStage, signature, showBoundary]);

  const handleVerification = async (username: string) => {
    try {
      await verify.mutateAsync({ username, signature, address });
      setLoginStage("signIn");
    } catch (e) {
      if (e instanceof Error) {
        console.error(`[${errorMessage.account.setUsername}]: ${e.message}`, e);
        showBoundary(e.message);
      } else {
        console.error(e);
        showBoundary(errorMessage.account.setUsername);
      }
    }
  };

  if (!isAskingUsername) return <LoginLoading />;

  return (
    <PageLayout title={text.general.enterUsername}>
      <Typography variant="body1" width="50vw" sx={styles.textOrange}>
        {text.general.usernameRules}
      </Typography>
      <Stack alignContent="center" width="100%">
        <RowCreateUsername submitUsername={handleVerification} />
        <Typography variant="body1" sx={styles.textWhite}>
          {text.general.usernameDisclaimer[0]}
          <br />
          {text.general.usernameDisclaimer[1]}
        </Typography>
      </Stack>
    </PageLayout>
  );
};
