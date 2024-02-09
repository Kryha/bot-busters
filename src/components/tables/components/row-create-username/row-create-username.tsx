import { Stack } from "@mui/material";
import { useEffect, useState, type FC } from "react";

import { UsernameInputField } from "~/components/input-field/index.js";
import { validUsernameSchema } from "~/constants/validation.js";
import { getRandomUsername } from "~/utils/username.js";

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
    let name: string;
    do {
      name = getRandomUsername();
    } while (name.length >= 12);
    name = name.replace(/[0-9 ]/g, "");
    name = name.replace(/[_\.]/g, "-");
    setUsername(name);
  }, []);

  const validateUsername = (name: string) => {
    const result = validUsernameSchema.safeParse(name);
    if (!result.success && result.error.issues[0]) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
    }
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
        onClick={() => void submitUsername(username)}
      />
    </Stack>
  );
};
