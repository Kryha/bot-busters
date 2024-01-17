import { type SxProps } from "@mui/material";

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
  } satisfies SxProps,
  text: {
    width: "60vw",
    overflow: "wrap",
    textAlign: "start",
    lineHeight: "35px",
    pt: "50px",
  } satisfies SxProps,
  gameRulesSection: {
    pt: "100px",
    pb: "30px",
  } satisfies SxProps,
  listElement: {
    mb: "-40px",
  } satisfies SxProps,
  pointsAndPenaltiesSection: {
    width: "62vw",
    ...sectionPadding,
  } satisfies SxProps,
  dailyLeaderboard: {
    width: "62vw",
    ...sectionPadding,
  } satisfies SxProps,
  playerProfiles: {
    width: "62vw",
    ...sectionPadding,
  } satisfies SxProps,
};
