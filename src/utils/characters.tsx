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
  characterName: string,
  isBot?: boolean,
  isSelected?: boolean,
) => {
  if (isSelected) {
    return isBot ? `${characterName}BotBusted` : `${characterName}Blink`;
  } else {
    return isBot ? `${characterName}BotWin` : `${characterName}Blink`;
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

export const getTransitionLines = (characterName: CharacterName) => {
  const transitionLinesMap = {
    hal: TransitionLinesHal,
    ash: TransitionLinesAsh,
    roy: TransitionLinesRoy,
    eve: TransitionLinesEve,
    dot: TransitionLinesDot,
  };

  return transitionLinesMap[characterName] || TransitionLinesVoting;
};
