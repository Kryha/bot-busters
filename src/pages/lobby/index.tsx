import { type FC } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Stack, Avatar } from "@mui/material";

import { Page } from "@/layouts";
import withAuth from "@/utils/withAuth";
import { api } from "@/utils/api";

import { faker } from "@faker-js/faker";
import { minidenticon } from "minidenticons";
import { useMemo } from "react";

const MinidenticonImg = (username: string) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(username, 90)),
    [username]
  );
  return svgURI;
};

const generateUser = () => {
  const firstName = faker.helpers.arrayElement([
    faker.word.adjective(5),
    faker.animal.horse(),
    faker.internet.domainWord(),
  ]);

  const lastName = faker.helpers.arrayElement([
    faker.word.adverb(5),
    faker.animal.cat(),
    faker.music.genre(),
  ]);
  const username = faker.internet.userName({
    firstName: firstName,
    lastName: lastName,
  });

  return {
    username: username.replace(/[0-9]/g, ""),
    avatar: MinidenticonImg(username),
  };
};

const Lobby: FC = () => {
  const router = useRouter();
  // TODO: update component
  const a = faker.helpers.multiple(generateUser, { count: 100 });

  api.lobby.onJoin.useSubscription(undefined, {
    onData(address) {
      console.log("[sub]", address, "joined");
    },
    onError(err) {
      console.error(err);
    },
  });

  const join = api.lobby.join.useMutation();

  return (
    <Page>
      <Typography variant="h1">Lobby</Typography>
      {a.map((something, index) => (
        <Stack mt={5} mb={5} gap={2} key={index}>
          <Avatar
            alt="avatar"
            src={something.avatar}
            sx={{ border: "0.5px solid", borderColor: "primary.main" }}
          />
          <Typography variant="h3">{something.username}</Typography>
        </Stack>
      ))}
      <Stack flexDirection="row" mt={2} gap={1}>
        <Button variant="text" onClick={() => void router.push("/")}>
          Back to home
        </Button>

        <Button variant="outlined" onClick={() => join.mutate()}>
          Join
        </Button>

        <Button variant="outlined" onClick={() => void router.push("/chat")}>
          Chat
        </Button>
      </Stack>
    </Page>
  );
};

export default withAuth(Lobby);
