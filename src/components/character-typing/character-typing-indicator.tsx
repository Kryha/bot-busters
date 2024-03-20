import { Box, Stack, Typography } from "@mui/material";
import { type FC, useState } from "react";
import { useRouter } from "next/router";

import type { MatchRoom, TypingPayload } from "~/types/index.js";

import { CHARACTERS } from "~/constants/characters.js";
import { pages } from "~/router.js";
import { api } from "~/utils/api.js";
import { styles } from "./styles.js";

interface Props {
  roomId: string;
  room: MatchRoom;
}
export const CharacterTypingIndicator: FC<Props> = ({ room, roomId }) => {
  const { players, stage } = room;
  const { push } = useRouter();

  const [characterTyping, setCharacterTyping] = useState("");
  const [, setTypingUsers] = useState(new Set<string>());
  const [isTyping, setIsTyping] = useState(false);

  const whoIsTyping = (typing: TypingPayload) => {
    setTypingUsers((currentTypingUsers) => {
      // Clone the current set to avoid direct state mutation
      const updatedTypingUsers = new Set(currentTypingUsers);

      if (typing.isTyping) {
        updatedTypingUsers.add(typing.sender);
      } else {
        updatedTypingUsers.delete(typing.sender);
      }

      // Update the character typing display
      const typingUsersArray = players.filter((player) =>
        updatedTypingUsers.has(player.userId),
      );

      let typingMessage = ",";
      if (typingUsersArray.length > 1) {
        const names = typingUsersArray.map(
          (player) => CHARACTERS[player.characterId].name,
        );
        const last = names.pop();
        typingMessage = `${names.join(", ")} and ${last} are`;
      } else if (typingUsersArray.length === 1) {
        typingMessage = `${
          CHARACTERS[typingUsersArray[0]!.characterId].name
        } is`;
      }

      setCharacterTyping(typingMessage);
      setIsTyping(updatedTypingUsers.size > 0);

      return updatedTypingUsers;
    });
  };

  api.match.onTyping.useSubscription(
    { roomId },
    {
      onData(payload) {
        whoIsTyping(payload);
      },
      onError(error) {
        console.error("Chat message error:", error);
        void push(pages.home);
      },
    },
  );

  return (
    <>
      {stage === "chat" && (
        <Stack sx={styles.typingDialog(isTyping)}>
          <Typography variant="caption" sx={styles.typing}>
            {characterTyping} typing
          </Typography>
          <Box component="div" sx={styles.loading} />
        </Stack>
      )}
    </>
  );
};
