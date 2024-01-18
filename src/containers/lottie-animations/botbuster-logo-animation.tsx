import { useLottie } from "lottie-react";
import botBustersLogoAnimation from "./bot-busters-logo.json";

export const BotBusterLogoAnimation = () => {
  const options = {
    animationData: botBustersLogoAnimation as unknown,
    loop: true,
  };
  const { View } = useLottie(options);

  return <>{View}</>;
};
