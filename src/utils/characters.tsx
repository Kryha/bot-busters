import { type CharacterName } from "~/types/index.js";
import {
  AvatarAsh,
  AvatarDot,
  AvatarEve,
  AvatarHal,
  AvatarRoy,
  TextAsh,
  TextDot,
  TextEve,
  TextHal,
  TextRoy,
} from "~/assets/characters/index.js";

// TODO: Change these to SVGs once received from designer
import splashHal from "~/assets/characters/hal.png";
import splashAsh from "~/assets/characters/ash.png";
import splashRoy from "~/assets/characters/roy.png";
import splashEve from "~/assets/characters/eve.png";
import splashDot from "~/assets/characters/dot.png";

export const getCharacterAvatar = (characterName: CharacterName) => {
  switch (characterName) {
    case "hal":
      return <AvatarHal />;
    case "ash":
      return <AvatarAsh />;
    case "roy":
      return <AvatarRoy />;
    case "eve":
      return <AvatarEve />;
    case "dot":
      return <AvatarDot />;
  }
};

// TODO: Change these to SVGs once received from designer
export const getCharacterSplashScreen = (characterName: CharacterName) => {
  switch (characterName) {
    case "hal":
      return splashHal;
    case "ash":
      return splashAsh;
    case "roy":
      return splashRoy;
    case "eve":
      return splashEve;
    case "dot":
      return splashDot;
  }
};

export const getCharacterTitle = (characterName: CharacterName) => {
  switch (characterName) {
    case "hal":
      return <TextHal />;
    case "ash":
      return <TextAsh />;
    case "roy":
      return <TextRoy />;
    case "eve":
      return <TextEve />;
    case "dot":
      return <TextDot />;
  }
};
