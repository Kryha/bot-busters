import { type CharacterName } from "~/types/index.js";
import { ErrorView } from "~/components/error-view/index.jsx";
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
  const animations = {
    hal: { botBusted: HalBotBusted, blink: HalBlink, botWin: HalBotWin },
    ash: { botBusted: AshBotBusted, blink: AshBlink, botWin: AshBotWin },
    roy: { botBusted: RoyBotBusted, blink: RoyBlink, botWin: RoyBotWin },
    eve: { botBusted: EveBotBusted, blink: EveBlink, botWin: EveBotWin },
    dot: { botBusted: DotBotBusted, blink: DotBlink, botWin: DotBotWin },
  };

  if (!animations[characterName]) {
    return <ErrorView />; // Handle invalid characterName
  }

  if (isSelected) {
    return isBot
      ? animations[characterName].botBusted
      : animations[characterName].blink;
  }

  return isBot
    ? animations[characterName].botWin
    : animations[characterName].blink;
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
