import { type FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  type AchievementId,
  type LoggedUserProfileData,
} from "~/types/index.js";

import { api } from "~/utils/api.js";
import { Header } from "./components/index.js";
import { text } from "~/assets/text/index.js";
import { matchAchievements } from "~/server/service/achievements.js";
import { POINTS_ACHIEVEMENTS } from "~/constants/main.js";
import { styles } from "./styles.js";

interface Props {
  playerProfile: LoggedUserProfileData;
}

const COLUMN_WIDTH = { sm: "5.0%", md: "20.5%", lg: "30%" };

type AchievementRow = {
  name: string;
  description: string;
  streak: string;
  pointsEarned: number;
  pointValue: number;
};

export const AchievementsTable: FC<Props> = ({ playerProfile }) => {
  const achievements = api.user.getUserAchievements.useQuery(undefined, {
    retry: false,
  });

  const achievementsDataStructure: Record<AchievementId, string> = {
    busterStreak: "x5",
    fiveDayStreak: "x2",
    firstTimer: "0",
    beginnersLuck: "0",
    goodBust: "0",
    masterBuster: "0",
    realHuman: "0",
    dailyStreakCounter: "0",
  };

  if (!playerProfile) return;

  const calculatePointsEarned = (achievementId: AchievementId) => {
    const numberOfAchievements = achievements?.data?.filter(
      (a) => a === achievementId,
    ).length;

    if (!numberOfAchievements) return 0;

    return numberOfAchievements * POINTS_ACHIEVEMENTS[achievementId];
  };

  const achievementRow: AchievementRow[] = Object.entries(
    achievementsDataStructure,
  )
    .filter(([achievementId]) => achievementId !== "dailyStreakCounter") // Filter out the dailyStreakCounter early
    .map(([achievementId, streak]): AchievementRow => {
      // Object.entries coverts achievementId to string, so we turn it back to AchievementId
      const achievementInfo = matchAchievements[achievementId as AchievementId];
      const pointsEarned = calculatePointsEarned(
        achievementId as AchievementId,
      );
      const pointValue = POINTS_ACHIEVEMENTS[achievementId as AchievementId];

      if (!achievementInfo) {
        throw new Error(
          `Achievement information not found for ID: ${achievementId}`,
        );
      }

      return {
        name: achievementInfo.name,
        description: achievementInfo.description,
        streak,
        pointValue,
        pointsEarned,
      };
    });

  // Sort the array in descending order based on pointsEarned
  const sortedAchievements = achievementRow.sort(
    (a, b) => b.pointsEarned - a.pointsEarned,
  );

  return (
    <TableContainer sx={styles.wrapper}>
      <Table sx={styles.table} aria-label="simple table">
        <colgroup>
          <col width={COLUMN_WIDTH.md} />
          <col width={COLUMN_WIDTH.lg} />
          <col width={COLUMN_WIDTH.sm} />
          <col width={COLUMN_WIDTH.sm} />
          <col width={COLUMN_WIDTH.sm} />
        </colgroup>
        <Header
          cells={text.playerProfile.achievementColumns}
          cellsToAlign={1}
        />
        <TableBody>
          {sortedAchievements.map(
            ({ name, description, pointsEarned, pointValue, streak }) => (
              <TableRow
                key={name}
                sx={styles.achievementTableRow(pointsEarned > 0)}
              >
                <TableCell align="left">
                  <Typography variant="body1">{name}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1">{description}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">{streak}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">{pointValue}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">{pointsEarned}</Typography>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
