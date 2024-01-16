import React, { type FC, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";
import { Skeleton } from "./skeleton.jsx";
import { type Character, type MatchStage } from "~/types/index.js";
import { text } from "~/assets/text/index.js";
import { CharacterAvatar } from "~/components/character-avatar/index.js";

interface Props {
  character: Character;
  selected?: boolean;
  isLocalPlayer?: boolean;
  hasGuessed?: boolean;
  isBot?: boolean;
  onSelectPlayer?: () => void;
  stage?: MatchStage;
}

export const Player: FC<Props> = ({
  character,
  isLocalPlayer = false,
  selected,
  hasGuessed,
  isBot,
  onSelectPlayer,
  stage = "chat",
}) => {
  const { name, color } = character;
  const textColor = `${color}.dark`;
  const [isBotSelect, setIsBotSelect] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (stage === "voting" && selected) {
      setIsBotSelect(true);
    } else {
      setIsBotSelect(false);
    }
  }, [selected, stage]);

  if (!name) return <Skeleton />;
  let textResult = isBot ? text.match.isBot : text.match.isHuman;

  if (stage === "results") {
    if (selected === true && isBot === true) {
      textResult = text.match.botBusted;
    } else if (selected === true && isBot === false) {
      textResult = text.match.isNotBot;
    } else if (selected === false && isBot === false) {
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
        isSelected={selected}
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
      {stage === "voting" && isBotSelect && (
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
            sx={styles.botResult(stage, isBot, selected)}
          >
            {textResult}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
