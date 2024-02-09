import { faker } from "@faker-js/faker";

export const getRandomUsername = () => {
  const usernamePart1 = faker.helpers.arrayElement([
    faker.word.adjective(3),
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

  return name;
};
