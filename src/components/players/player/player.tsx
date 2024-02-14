import { Stack, Typography } from "@mui/material";
import { type FC } from "react";

import { BotArrowIcon } from "~/assets/icons/index.js";
import { text } from "~/assets/text/index.js";
import { CharacterAvatar } from "~/components/character-avatar/index.js";
import { type Character, type MatchStage } from "~/types/index.js";
import { Skeleton } from "./skeleton.jsx";

import { styles } from "./styles.js";

interface Props {
  character: Character;
  isProofSelected?: boolean;
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
  isProofSelected,
  hasGuessed,
  isBot,
  onSelectPlayer,
  stage = "chat",
}) => {
  const { name, color } = character;
  const textColor = `${color}.main`;

  const isBotSelected = stage === "voting" && isSelected;

  if (!name) return <Skeleton />;

  const getTextResult = () => {
    if (stage === "results") {
      if (isSelected) {
        return isBot ? text.match.botBusted : text.match.wrongBust;
      }
      return isBot ? text.match.missedBot : text.match.isHuman;
    }

    return isBot ? text.match.isBot : text.match.isHuman;
  };

  const textResult = getTextResult();

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
      {stage === "voting" && (
        <Stack direction={"row"} gap={1}>
          <Typography variant="caption" sx={styles.selectBot(isBotSelected)}>
            {text.match.isBotSelect}
          </Typography>
        </Stack>
      )}
      {stage === "results" && (
        <Stack
          sx={styles.botResult(stage, isBot, isSelected, isProofSelected)}
          onClick={onSelectPlayer}
        >
          <Typography variant="caption">{textResult}</Typography>
          <BotArrowIcon />
        </Stack>
      )}
    </Stack>
  );
};
