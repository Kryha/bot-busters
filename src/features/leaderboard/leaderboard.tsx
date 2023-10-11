import { Box, Stack, Typography } from "@mui/material";
import { CollapsibleTable } from "./components";
import { leaderboard } from "./fake-data";
import { Lead } from "./components/lead";

export const Leaderboard = () => {
  return (
    <>
      <Typography variant="h2">Leaderboard</Typography>
      <Box sx={{ width: { sm: "100vw", md: "60vw", lg: "60vw" } }}>
        {leaderboard.map((data, index) => (
          <Lead leaderboard={data} key={index} />
        ))}
      </Box>
    </>
  );
};
