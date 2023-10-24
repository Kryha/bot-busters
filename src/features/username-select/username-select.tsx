import { useState, type FC, useMemo } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { faker } from "@faker-js/faker";
import { text } from "./assets";

import { minidenticon } from "minidenticons";

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
  };
};

export const UsernameSelect: FC = () => {
  const [user, setUser] = useState(generateUser()); // Initial user state
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user.username);

  const handleGenerateUsername = () => {
    const newUser = generateUser();
    setUser(newUser);
    setEditedUsername(newUser.username);
    setIsEditing(false);
  };

  const handleSaveUsername = () => {
    setUser({ ...user, username: editedUsername });
    setIsEditing(false);
  };

  return (
    <Stack sx={{ alignItems: "center", gap: 5 }}>
      <Typography variant="h2">{text.chooseUsername}</Typography>
      {/* 50vw normal sm100vw */}
      <Stack sx={{ flexDirection: "row", gap: 2 }} width={{ sm: "100vw" }}>
        <Button onClick={() => setIsEditing(true)}>{text.modify}</Button>
        {isEditing ? (
          <TextField
            label="Username"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
          />
        ) : (
          <TextField
            label="Username"
            value={user.username}
            disabled
            fullWidth
          />
        )}
        <Button variant="outlined" onClick={handleGenerateUsername}>
          {text.generate}
        </Button>
      </Stack>

      <Button onClick={handleSaveUsername} variant="contained" color="primary">
        {text.select}
      </Button>
    </Stack>
  );
};
