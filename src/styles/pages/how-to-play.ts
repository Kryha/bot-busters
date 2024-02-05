import type { SxStyleRecord } from "~/types/sx-style-record.js";

const sectionPadding = {
  pt: "30px",
  pb: "100px",
};

export const styles = {
  container: {
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "start",
  },
  text: {
    width: "60vw",
    overflow: "wrap",
    textAlign: "start",
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
  heading: {
    textTransform: "uppercase",
    textAlign: "center",
  },
} satisfies SxStyleRecord;
