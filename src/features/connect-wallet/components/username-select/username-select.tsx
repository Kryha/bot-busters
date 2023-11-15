import { type FC } from "react";
import { Stack } from "@mui/material";

import { AddUsernameTable, CreateUsernameRow } from "@/components/tables";
import { styles } from "./styles";
import { api } from "@/utils/api";
import { signIn, useSession } from "next-auth/react";

export const UsernameSelect: FC = () => {
  const { data: sessionData } = useSession();
  const signdMessage = sessionStorage.getItem("signedMessage");
  const verifyUser = api.user.verify.useMutation();
  const handleSetUsername = async (username: string) => {
    try {
      verifyUser.mutate({
        address: sessionData?.user.address,
        username,
        signature: signdMessage ?? undefined,
      });
      if (verifyUser.isSuccess) {
        await signIn("credentials", {
          address: sessionData?.user.address,
          signedMessage: signdMessage,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: finish component

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <AddUsernameTable />
        <CreateUsernameRow
          handleSetUsername={handleSetUsername}
          error={verifyUser.error?.message}
        />
      </Stack>
    </Stack>
  );
};
