import { Stack, type SxProps } from "@mui/material";

import { AddUsernameTable } from "@/components/tables";
import { RowCreateUsername } from "@/components/tables/components";
import { Page } from "@/layouts";

import { type FC, useEffect } from "react";
import { useRouter } from "next/router";
import { isVerifiedSession } from "@/utils/session";
import { signIn, useSession } from "next-auth/react";
import { pages } from "@/utils/router";
import { api } from "@/utils/api";
import { useBBWallet } from "@/hooks/bb-wallet";

// TODO: move styles to another file
const styles = {
  wrapper: {
    // TODO: add color to theme
    backgroundColor: "#9E9E9E1E",
    width: "100%",
    alignItems: "center",
  },
  container: {
    position: "relative",
    overflow: "hidden",
    height: "100vh",
  } satisfies SxProps,
};

const UsernameSelect: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { address, getSignature } = useBBWallet();

  const verify = api.user.verify.useMutation();

  useEffect(() => {
    if (isVerifiedSession(session)) {
      void router.push(pages.home);
    }
  }, [router, session]);

  const handleSetUsername = async (username: string) => {
    try {
      const signature = await getSignature();
      await verify.mutateAsync({ username, signature, address });
      await signIn("credentials", {
        signature,
        address,
        callbackUrl: pages.home,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page>
      <Stack sx={styles.wrapper}>
        <Stack sx={styles.container}>
          <AddUsernameTable />
          <RowCreateUsername
            onSetUsername={handleSetUsername}
            error={verify.error?.message}
          />
        </Stack>
      </Stack>
    </Page>
  );
};

export default UsernameSelect;
