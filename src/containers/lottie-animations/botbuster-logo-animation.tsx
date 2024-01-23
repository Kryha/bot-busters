import { useLottie } from "lottie-react";
import botBustersLogoAnimation from "./bot-busters-logo.json" assert { type: "json" };

export const BotBusterLogoAnimation = () => {
  const options = {
    animationData: botBustersLogoAnimation as unknown,
    loop: true,
  };
  const { View } = useLottie(options);

  return <>{View}</>;
};
