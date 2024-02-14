import { type FC, useEffect, useRef } from "react";
import { Stack, Typography } from "@mui/material";

import { type Character, type MatchStage } from "~/types/index.js";
import { CharacterAvatar } from "~/components/character-avatar/index.js";
import { Skeleton } from "./skeleton.jsx";
import { BotArrowIcon } from "~/assets/icons/index.js";
import { text } from "~/assets/text/index.js";

import { styles } from "./styles.js";

interface Props {
  character: Character;
  isProofSelected?: boolean;
  isSelected?: boolean;
  isLocalPlayer?: boolean;
  hasGuessed?: boolean;
  isBot?: boolean;
  onSelectPlayer?: (hovered?: boolean) => void;
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

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMouseEnter = () => {
      if (onSelectPlayer) {
        onSelectPlayer(false);
      }
    };

    const onMouseLeave = () => {
      if (onSelectPlayer) {
        onSelectPlayer(true);
      }
    };

    if (containerRef.current) {
      const container = containerRef.current;
      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [onSelectPlayer]);

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
    <Stack ref={containerRef} sx={styles.container}>
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
        <Stack sx={styles.botResult(stage, isBot, isSelected, isProofSelected)}>
          <Typography variant="caption">{textResult}</Typography>
          <BotArrowIcon />
        </Stack>
      )}
    </Stack>
  );
};
