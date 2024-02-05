import { useState, type FC, useEffect } from "react";
import { Stack } from "@mui/material";

import { getRandomUsername } from "~/utils/username.js";
import { validUsername } from "~/constants/validation.js";
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
    const result = validUsername.safeParse(name);
    if (!result.success && result.error.issues[0]) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
    }
  };

  const handleUsername = (event: { target: { value: string } }) => {
    console.log(error, username);
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
        onClick={() => void submitUsername(username)}
      />
    </Stack>
  );
};
