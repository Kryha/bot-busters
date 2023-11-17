import { useStore } from "@/store";
import { Divider, Stack, Typography } from "@mui/material";
import { styles } from "./styles";
import { text } from "./text";

export const Score = () => {
  const matchState = useStore((state) => state.matchState);

  if (matchState !== "results") return;

  return (
    <Stack sx={styles.container}>
      <Divider />
      <Stack sx={styles.score}>
        <Typography variant="body1">{text.yourScore}</Typography>
        <Typography variant="body1">{text.points1}</Typography>
      </Stack>
      <Divider />
    </Stack>
  );
};
