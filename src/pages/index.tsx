import { useSession } from "next-auth/react";
import { Page } from "@/layouts";
import { isValidSession } from "@/utils/session";
import { Button, Stack, Typography } from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { AuthButton } from "@/components";
import { pages } from "@/utils/router";
import { UsernameSelect } from "@/features/connect-wallet/components/username-select";

// TODO: define text in another file
export default function Home() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const join = api.lobby.join.useMutation();

  return (
    <Page>
      <UsernameSelect />
    </Page>
  );
}
