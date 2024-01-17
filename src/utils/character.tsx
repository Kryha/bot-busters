import { Ash, Dot, Eve, Hal, Roy } from "~/assets/characters/index.js";

export const getCharacter = (characterName: string) => {
  switch (characterName) {
    case "hal":
      return <Hal />;
    case "ash":
      return <Ash />;
    case "roy":
      return <Roy />;
    case "eve":
      return <Eve />;
    case "dot":
      return <Dot />;
    default:
      return <Hal />;
  }
};
