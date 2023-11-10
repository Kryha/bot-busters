/* eslint-disable @typescript-eslint/unbound-method */
//TODO: delete when changing layout
import { useState, type MouseEvent, type FC, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { signOut } from "next-auth/react";
import { Avatar, Button, Chip, Stack, Typography } from "@mui/material";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { text } from "@/assets/text";
import { fakeStats } from "@/constants";
import { CHIP_TIMEOUT } from "@/features/landing/constants";
import { styles } from "./styles";
import { MenuCard } from "./menu-card";

interface Props {
  isMenuVisible: boolean;
  username: string;
}

export const UserMenu: FC<Props> = ({ isMenuVisible, username }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isChipVisible, setIsChipVisible] = useState(true);
  const { disconnect } = useWallet();
  const open = !!anchorEl;
  const endIcon = open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
  const expanded = open ? "true" : undefined;
  const menuControl = open ? "menu" : undefined;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await signOut();
    await disconnect();
    handleClose();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChipVisible(false);
    }, CHIP_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isMenuVisible) return;

  return (
    <Stack sx={styles.userMenuWrapper}>
      {isChipVisible && (
        <Chip
          label={text.landing.youWonCredits}
          color="warning"
          sx={styles.creditsWonChip}
        />
      )}
      <Avatar alt="avatar" sx={styles.avatar}>
        {text.leaderboard.avatarEmoji}
      </Avatar>
      <Button
        id="button"
        aria-controls={menuControl}
        aria-haspopup="true"
        aria-expanded={expanded}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={endIcon}
        color="blueGrey"
        sx={styles.menuButton}
      >
        <Typography
          variant="body1"
          sx={styles.buttonText(open)}
          color="blueGrey.main"
        >
          {username}
        </Typography>
      </Button>
      <MenuCard
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        logout={logout}
        stats={fakeStats}
      />
    </Stack>
  );
};
