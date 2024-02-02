import { useState, type FC, useEffect } from "react";
import { Stack } from "@mui/material";

import { getRandomUsername } from "~/utils/username.js";
import { validUsername, validation } from "~/constants/validation.js";
import { profanityFilter } from "~/service/index.js";
import { UsernameInputField } from "~/components/input-field/input-field.jsx";

import { styles } from "./styles.js";

interface RowCreateUsernameProps {
  submitUsername: (username: string) => Promise<void>;
}

export const RowCreateUsername: FC<RowCreateUsernameProps> = ({
  submitUsername,
}) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const name = getRandomUsername();
    setUsername(name.replace(/[0-9]/g, ""));
  }, []);

  const validateUsername = (name: string) => {
    let err = "";
    if (!validUsername.safeParse(name).success)
      err = validation.username.error.length;
    if (profanityFilter.exists(name)) err = validation.username.error.profanity;
    if (!(name.indexOf(" ") === -1)) err = validation.username.error.space;
    setError(err);
  };

  const handleUsername = (event: { target: { value: string } }) => {
    validateUsername(event.target.value);
    setUsername(event.target.value);
  };

  return (
    <Stack sx={styles.wrapper}>
      <UsernameInputField
        validationError={error}
        id="username"
        value={username}
        onChange={handleUsername}
        onSubmit={() => void submitUsername(username)}
      />
    </Stack>
  );
};
