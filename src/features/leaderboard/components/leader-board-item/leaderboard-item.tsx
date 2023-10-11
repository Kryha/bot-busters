import { useState, type FC } from "react";
import { ListItem, ListItemButton } from "@mui/material";

import { ListRow, CollapsibleRow } from "@/features/leaderboard/components";
import { type Leaderboard } from "@/types";

interface Props {
  leaderboard: Leaderboard;
}

export const LeaderBoardItem: FC<Props> = ({ leaderboard }) => {
  const [toggle, setToggle] = useState(false);
  // TODO: update styles and content
  return (
    <>
      <ListItem disablePadding onClick={() => setToggle(!toggle)}>
        <ListItemButton>
          <ListRow leaderboard={leaderboard} />
        </ListItemButton>
      </ListItem>
      <CollapsibleRow open={toggle} leaderboard={leaderboard} />
    </>
  );
};
