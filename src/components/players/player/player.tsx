import React, { type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { type Character, type MatchStage } from "~/types/index.js";
import { CharacterAvatar } from "~/components/character-avatar/index.js";
import { text } from "~/assets/text/index.js";
import { Skeleton } from "./skeleton.jsx";

import { styles } from "./styles.js";

interface Props {
  character: Character;
  isSelected?: boolean;
  isLocalPlayer?: boolean;
  hasGuessed?: boolean;
  isBot?: boolean;
  onSelectPlayer?: () => void;
  stage?: MatchStage;
}

export const Player: FC<Props> = ({
  character,
  isLocalPlayer = false,
  isSelected,
  hasGuessed,
  isBot,
  onSelectPlayer,
  stage = "chat",
}) => {
  const { name, color } = character;
  const textColor = `${color}.dark`;

  const isBotSelected = stage === "voting" && isSelected;

  if (!name) return <Skeleton />;

  let textResult = isBot ? text.match.isBot : text.match.isHuman;

  if (stage === "results") {
    if (isSelected && isBot) {
      textResult = text.match.botBusted;
    } else if (isSelected && !isBot) {
      textResult = text.match.isNotBot;
    } else if (!isSelected && !isBot) {
      textResult = text.match.isHuman;
    }
  }

  return (
    <Stack sx={styles.container}>
      {stage !== "chat" && (
        <Typography variant="body1" sx={styles.character} color={textColor}>
          {name}
        </Typography>
      )}
      <CharacterAvatar
        stage={stage}
        character={character}
        isSelected={isSelected}
        hasGuessed={hasGuessed}
        isBot={isBot}
        onSelectPlayer={onSelectPlayer}
      />
      {stage === "chat" && (
        <>
          <Typography variant="body1" sx={styles.character} color={textColor}>
            {name}
          </Typography>
          {isLocalPlayer && (
            <Typography variant="body1" sx={styles.character} color={textColor}>
              {text.match.localPlayer}
            </Typography>
          )}
        </>
      )}
      {stage === "voting" && isBotSelected && (
        <Stack direction={"row"} gap={1}>
          <Typography variant="body1" sx={styles.selectBot}>
            {text.match.isBotSelect}
          </Typography>
        </Stack>
      )}
      {stage === "results" && (
        <Stack direction={"row"} gap={1}>
          <Typography
            variant="caption"
            sx={styles.botResult(stage, isBot, isSelected)}
          >
            {textResult}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
