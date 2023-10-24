import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

export const useCreateRandomUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const usernamePart1 = faker.helpers.arrayElement([
      faker.word.adjective(5),
      faker.animal.horse(),
      faker.internet.domainWord(),
    ]);

    const usernamePart2 = faker.helpers.arrayElement([
      faker.word.adverb(5),
      faker.animal.cat(),
      faker.music.genre(),
    ]);

    const name = faker.internet.userName({
      firstName: usernamePart1,
      lastName: usernamePart2,
    });

    setUsername(name.replace(/[0-9]/g, ""));
  }, []);

  return username;
};

export const useCreateChatUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const colorList = ["blue", "orange", "brown", "green", "pink"];
    const color = colorList[Math.floor(Math.random() * colorList.length)];
    const userNamePart2 = faker.helpers.arrayElement([
      faker.word.adverb(5),
      faker.animal.cat(),
      faker.word.adjective(5),
      faker.animal.horse(),
    ]);

    const name = faker.internet.userName({
      firstName: color,
      lastName: userNamePart2,
    });

    setUsername(name.replace(/[0-9]/g, ""));
  }, []);

  return username;
};
