import dynamic from "next/dynamic";

export const AnimationPlayer = dynamic(
  () => import("react-lottie-player/dist/LottiePlayerLight"),
  {
    ssr: false,
  },
);
