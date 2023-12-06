import { Homepage } from "~/containers/home/index.js";
import { ReCaptchaProvider } from "~/containers/reCaptcha";

export default function Home() {
  return (
    <ReCaptchaProvider>
      <Homepage />
    </ReCaptchaProvider>
  );
}
