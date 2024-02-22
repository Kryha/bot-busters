import type {
  PersonalityTrait,
  TraitValue,
  TraitDescriptions,
} from "~/types/index.js";

const personalityMatrix: Record<PersonalityTrait, TraitDescriptions> = {
  openness: {
    1: "Prefers routine over new experiences.",
    2: "Somewhat open to new experiences, but prefers familiar situations.",
    3: "Has a balance between seeking new experiences and appreciating routine.",
    4: "Very open to new experiences and enjoys exploring new ideas.",
    5: "Seeks out new experiences and ideas constantly and is highly imaginative.",
  },
  conscientiousness: {
    1: "Tends to act spontaneously rather than planning ahead.",
    2: "Shows some degree of organization but can be flexible.",
    3: "Balances well between organization and flexibility.",
    4: "Highly organized and dependable.",
    5: "Extremely detailed and always prepared.",
  },
  extraversion: {
    1: "Prefers solitude and quiet to social situations.",
    2: "Somewhat reserved but can enjoy social interaction.",
    3: "Comfortable in social situations, but also appreciates alone time.",
    4: "Very outgoing and energetic in social settings.",
    5: "Highly sociable, enjoys being the center of attention.",
  },
  agreeableness: {
    1: "More competitive than cooperative.",
    2: "Generally kind but can be competitive.",
    3: "Balances kindness with a healthy sense of competition.",
    4: "Very cooperative and enjoys helping others.",
    5: "Highly empathetic, always putting others first.",
  },
  neuroticism: {
    1: "Remains calm and composed, even in stressful situations.",
    2: "Generally handles stress well but can feel anxious at times.",
    3: "Has an average amount of emotional reactions.",
    4: "Tends to feel stressed or anxious more easily than others.",
    5: "Highly sensitive to stress and can be very emotional.",
  },
};

export function describePersonality(
  traits: Record<PersonalityTrait, TraitValue>,
): string {
  console.log("🚀 ~ returnObject.entries ~ traits:", traits);
  const personalityDescription = Object.entries(traits).map(
    ([trait, value]) => {
      // Directly access the descriptions without needing a type assertion
      const description = personalityMatrix[trait as PersonalityTrait][value];
      if (!description) {
        throw new Error(
          `Description not found for trait ${trait} with value ${value}`,
        );
      }
      return description;
    },
  );
  return personalityDescription.join(" ");
}
