import { type CharacterName } from "~/types/index.js";
import {
  AvatarAsh,
  AvatarDot,
  AvatarEve,
  AvatarHal,
  AvatarRoy,
  SplashAsh,
  SplashDot,
  SplashEve,
  SplashHal,
  SplashRoy,
  TextAsh,
  TextDot,
  TextEve,
  TextHal,
  TextRoy,
} from "~/assets/characters/index.js";

import {
  AshBlink,
  AshBotBusted,
  AshBotWin,
  DotBlink,
  DotBotBusted,
  DotBotWin,
  EveBlink,
  EveBotBusted,
  EveBotWin,
  HalBlink,
  HalBotBusted,
  HalBotWin,
  RoyBlink,
  RoyBotBusted,
  RoyBotWin,
  TransitionLinesAsh,
  TransitionLinesDot,
  TransitionLinesEve,
  TransitionLinesHal,
  TransitionLinesRoy,
  TransitionLinesVoting,
} from "~/assets/animations/index.js";

export const getCharacterAvatar = (characterName: CharacterName) => {
  const avatarMap = {
    hal: <AvatarHal />,
    ash: <AvatarAsh />,
    roy: <AvatarRoy />,
    eve: <AvatarEve />,
    dot: <AvatarDot />,
  };

  return avatarMap[characterName];
};

export const getCharacterAnimation = (
  characterName: CharacterName,
  isBot?: boolean,
  isSelected?: boolean,
) => {
  switch (characterName) {
    case "hal":
      if (isSelected && isBot) {
        return HalBotBusted;
      }
      if (isSelected && !isBot) {
        return HalBlink;
      }
      if (!isSelected && isBot) {
        return HalBotWin;
      }
      return HalBlink;
    case "ash":
      if (isSelected && isBot) {
        return AshBotBusted;
      }
      if (isSelected && !isBot) {
        return AshBlink;
      }
      if (!isSelected && isBot) {
        return AshBotWin;
      }
      return AshBlink;
    case "roy":
      if (isSelected && isBot) {
        return RoyBotBusted;
      }
      if (isSelected && !isBot) {
        return RoyBlink;
      }
      if (!isSelected && isBot) {
        return RoyBotWin;
      }
      return RoyBlink;
    case "eve":
      if (isSelected && isBot) {
        return EveBotBusted;
      }
      if (isSelected && !isBot) {
        return EveBlink;
      }
      if (!isSelected && isBot) {
        return EveBotWin;
      }
      return EveBlink;
    case "dot":
      if (isSelected && isBot) {
        return DotBotBusted;
      }
      if (isSelected && !isBot) {
        return DotBlink;
      }
      if (!isSelected && isBot) {
        return DotBotWin;
      }
      return DotBlink;
  }
};

export const getCharacterSplashScreen = (characterName: CharacterName) => {
  const splashScreenMap = {
    hal: <SplashHal />,
    ash: <SplashAsh />,
    roy: <SplashRoy />,
    eve: <SplashEve />,
    dot: <SplashDot />,
  };

  return splashScreenMap[characterName];
};

export const getCharacterTitle = (characterName: CharacterName) => {
  const titleMap = {
    hal: <TextHal />,
    ash: <TextAsh />,
    roy: <TextRoy />,
    eve: <TextEve />,
    dot: <TextDot />,
  };

  return titleMap[characterName];
};

export const getTransitionLines = (characterName: string | undefined) => {
  switch (characterName) {
    case "hal":
      return TransitionLinesHal;
    case "ash":
      return TransitionLinesAsh;
    case "roy":
      return TransitionLinesRoy;
    case "eve":
      return TransitionLinesEve;
    case "dot":
      return TransitionLinesDot;
    default:
      return TransitionLinesVoting;
  }
};
