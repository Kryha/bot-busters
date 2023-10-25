import { useState, type FC } from "react";

import { Avatar, Button, Stack, TextField } from "@mui/material";

import { styles } from "./styles";
import { useCreateRandomUsername } from "@/hooks/name-generator";
import { useMinidenticonImg } from "@/hooks/avatar-generator";

export const CreateUsername: FC = () => {
  const username = useCreateRandomUsername();
  const [user, setUser] = useState(username);
  const avatar = useMinidenticonImg(username);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user);

  const handleSaveUsername = () => {
    setUser(editedUsername);
    setIsEditing(false);
  };

  // TODO: finish component
  return (
    <Stack sx={styles.wrapper}>
      <Avatar src={avatar} alt="avatar" />
      {isEditing ? (
        <TextField
          label="Username"
          value={editedUsername}
          onChange={(e) => setEditedUsername(e.target.value)}
        />
      ) : (
        <TextField label="Username" value={user} disabled fullWidth />
      )}
      <Button variant="outlined" onClick={handleSaveUsername}>
        something
      </Button>
    </Stack>
  );
};
