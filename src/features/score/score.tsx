import { useStore } from "@/store";
import { Divider, Stack, Typography } from "@mui/material";
import { styles } from "./styles";
import { text } from "./text";

export const Score = () => {
  const matchState = useStore((state) => state.matchState);

  if (matchState !== "results") return null;

  return (
    <Stack sx={styles.container}>
      <Divider />
      <Stack sx={styles.score}>
        <Typography variant="body1">{text.yourScore}</Typography>
        <Typography variant="body1">{text.points1}</Typography>
      </Stack>
      <Divider />
      <Stack>
        <Typography variant="overline">{text.bonusPoints}</Typography>
        <Stack sx={styles.points}>
          <Stack sx={styles.point}>
            <Typography variant="body1">{text.votesOn}</Typography>
            <Typography variant="body1">{text.points2}</Typography>
          </Stack>
          <Stack sx={styles.point}>
            <Typography variant="body1">{text.madeOther}</Typography>
            <Typography variant="body1">{text.points3}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
