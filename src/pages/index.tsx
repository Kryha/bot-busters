import Login from "./login";
import { useSession } from "next-auth/react";
import { Page } from "@/layouts";
import { isValidSession } from "@/utils/session";
import { Button } from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

// TODO: define text in another file
export default function Home() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const join = api.lobby.join.useMutation();

  useEffect(() => {
    console.log("home effect");
    if (join.status === "success") {
      const { myPlaceInQueue, queueLength } = join.data;

      void router.push({
        pathname: "/lobby",
        query: { myPlaceInQueue, queueLength },
      });
    }
  }, [join.data, join.status, router]);

  return (
    <Page>
      {isValidSession(sessionData) ? (
        <Button onClick={() => join.mutate()}>Play</Button>
      ) : (
        <Login />
      )}
    </Page>
  );
}
