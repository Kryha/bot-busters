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
import { fakeDateAndCreditsOne, fakeDateAndCreditsTwo } from "@/constants";
import { styles } from "./styles";
import { PointsDisplay } from "../points-display";

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
                title={text.landing.todaysScore}
                info={text.landing.points(stats.todaysPoints)}
              />
              <PointsDisplay
                title={text.landing.todaysPosition}
                info={text.landing.numberPosition(stats.todaysPosition)}
              />
            </Stack>
            <Stack sx={styles.pointsContainer}>
              <PointsDisplay
                title={text.landing.allTimeScore}
                info={text.landing.points(stats.allTimePoints)}
              />
              <PointsDisplay
                title={text.landing.allTimePosition}
                info={text.landing.numberPosition(stats.allTimePosition)}
              />
            </Stack>
          </Stack>
          <Divider />
          <Stack>
            <Typography variant="overline">
              {text.landing.aleoCreditsPayout}
            </Typography>
            <Stack sx={styles.statsContainer}>
              <Typography variant="body1">
                {text.landing.dateAndCredits(
                  fakeDateAndCreditsOne.date,
                  fakeDateAndCreditsOne.credits
                )}
              </Typography>
              <Chip
                size="small"
                label={text.landing.newCredits}
                color="warning"
                sx={styles.chip}
              />
            </Stack>
            <Typography variant="body1">
              {text.landing.dateAndCredits(
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
            {text.landing.signOut}
          </Button>
        </Stack>
      </MenuItem>
    </Menu>
  );
};
