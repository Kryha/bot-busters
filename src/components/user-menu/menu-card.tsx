import { type FC } from "react";
import {
  Button,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import { text } from "@/assets/text";
import { type UserStatsData } from "@/types";
import { styles } from "./styles";
import { PointsDisplay } from "../points-display";
import {
  fakeDateAndCreditsOne,
  fakeDateAndCreditsTwo,
} from "@/constants/fake-data/landing";

interface Props {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  logout: () => Promise<void>;
  stats: UserStatsData;
}

export const MenuCard: FC<Props> = ({
  open,
  anchorEl,
  handleClose,
  logout,
  stats,
}) => {
  return (
    <Menu
      id="menu"
      MenuListProps={{
        "aria-labelledby": "button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={styles.menu}
    >
      <MenuItem disableRipple sx={styles.menuItem}>
        <Stack sx={styles.menuItemWrapper}>
          <Stack sx={styles.menuItemContainer}>
            <Stack sx={styles.pointsContainer}>
              <PointsDisplay
                title={text.general.todaysScore}
                info={text.general.points(stats.todaysPoints)}
              />
              <PointsDisplay
                title={text.general.todaysPosition}
                info={text.general.numberPosition(stats.todaysPosition)}
              />
            </Stack>
            <Stack sx={styles.pointsContainer}>
              <PointsDisplay
                title={text.general.allTimeScore}
                info={text.general.points(stats.allTimePoints)}
              />
              <PointsDisplay
                title={text.general.allTimePosition}
                info={text.general.numberPosition(stats.allTimePosition)}
              />
            </Stack>
          </Stack>
          <Divider />
          <Stack>
            <Typography variant="overline">
              {text.general.aleoCreditsPayout}
            </Typography>
            <Stack sx={styles.statsContainer}>
              <Typography variant="body1">
                {text.general.dateAndCredits(
                  fakeDateAndCreditsOne.date,
                  fakeDateAndCreditsOne.credits
                )}
              </Typography>
              <Chip
                size="small"
                label={text.general.newCredits}
                color="warning"
                sx={styles.chip}
              />
            </Stack>
            <Typography variant="body1">
              {text.general.dateAndCredits(
                fakeDateAndCreditsTwo.date,
                fakeDateAndCreditsTwo.credits
              )}
            </Typography>
          </Stack>
          <Divider />
          <Button
            variant="contained"
            color="blueGrey"
            onClick={() => void logout()}
          >
            {text.general.signOut}
          </Button>
        </Stack>
      </MenuItem>
    </Menu>
  );
};
