import { useState, type FC, useEffect } from "react";
import { Stack } from "@mui/material";
import { z } from "zod";

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
    if (!validUsername.safeParse(name).success) {
      if (
        !z
          .string()
          .regex(/^[a-zA-Z0-9_\-.]*$/)
          .safeParse(name).success
      )
        err = validation.username.error.specialCharacters;
      if (!z.string().min(validation.username.min).safeParse(name).success)
        err = validation.username.error.tooShort;
      if (!z.string().max(validation.username.max).safeParse(name).success)
        err = validation.username.error.tooLong;
    }
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
        onClick={() => void submitUsername(username)}
      />
    </Stack>
  );
};
