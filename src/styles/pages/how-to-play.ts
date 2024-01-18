import type { SxStyleRecord } from "~/types/sx-style-record";

const sectionPadding = {
  pt: "30px",
  pb: "100px",
};

export const styles = {
  container: {
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "start",
    pt: "159px",
  },
  text: {
    width: "60vw",
    overflow: "wrap",
    textAlign: "start",
    lineHeight: "35px",
    pt: "50px",
  },
  gameRulesSection: {
    pt: "100px",
    pb: "30px",
  },
  listElement: {
    mb: "-40px",
  },
  pointsAndPenaltiesSection: {
    width: "62vw",
    ...sectionPadding,
  },
  dailyLeaderboard: {
    width: "62vw",
    ...sectionPadding,
  },
  playerProfiles: {
    width: "62vw",
    ...sectionPadding,
  },
} satisfies SxStyleRecord;
