/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useSession } from "next-auth/react";
import { Page } from "@/layouts";
import { isValidSession } from "@/utils/session";
import { Button, Stack, Typography } from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { AnonymousAuthButton, LogoutButton } from "@/components";
import { pages } from "@/utils/router";
import { text } from "@/assets/text";
import { Leaderboard } from "@/features";
import { styles } from "./styles";
import { LeaderboardToggleButton } from "@/features/leaderboard/components/leaderboard-toggle/leaderboard-toggle";
import { Landing } from "@/features/landing";

// TODO: define text in another file
export default function Home() {
  // const router = useRouter();
  // const { data: sessionData } = useSession();
  // const join = api.lobby.join.useMutation();
  // TODO: finish and fix styling and text
  return (
    <Page>
      <Landing />
    </Page>
  );
}
