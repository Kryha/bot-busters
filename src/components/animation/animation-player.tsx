import dynamic from "next/dynamic";
import { Stack, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Stack>
      <Typography variant={"h3"}>Loading...</Typography>
    </Stack>
  );
};
export const AnimationPlayer = dynamic(
  () => import("react-lottie-player/dist/LottiePlayerLight"),
  {
    loading: Loader,
    ssr: false,
  },
);
