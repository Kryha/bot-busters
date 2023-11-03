import { useState, type FC, useEffect } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { styles } from "./styles";
import { UsernameLocal, UsersOthers } from "@/features/chat/components";
import { useRouter } from "next/router";

export type GameStateType = "Initial" | "Decision" | "Results";

export const ParticipantsOverview: FC = () => {
  const [gameState, setGameState] = useState<GameStateType>("Initial");
  const isResults = gameState === "Results";

  // TODO: Fix router
  const { query } = useRouter();
  const parsed = query.gameState as GameStateType;
  useEffect(() => {
    if (parsed) return setGameState(parsed);
  }, [parsed]);

  const wrapperStyles = styles[`wrapper${gameState}`];
  const handleDecided = () => setGameState("Results");

  return (
    <Stack component="section" sx={wrapperStyles}>
      <Stack sx={styles.container}>
        <UsernameLocal />
        <Divider sx={styles.divider} />
        <UsersOthers gameState={gameState} onDecided={handleDecided} />
      </Stack>
      {isResults && <Score />}
    </Stack>
  );
};

export const Score = () => {
  return (
    <Stack sx={{ width: 1, gap: 3 }}>
      <Divider />
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography variant="body1">Your score: 3 correct answers</Typography>
        <Typography variant="body1">+30</Typography>
      </Stack>
      <Divider />
      <Stack>
        <Typography variant="overline">bonus points</Typography>
        <Stack sx={{ gap: 1 }}>
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Typography variant="body1">
              Votes on you being a bot: 2x
            </Typography>
            <Typography variant="body1">+50</Typography>
          </Stack>
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Typography variant="body1">
              Made other participants say banana: 1x
            </Typography>
            <Typography variant="body1">+10</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
