import { Homepage } from "~/containers/home/index.js";
import { RecaptchaProvider } from "~/containers/recaptcha-provider/index.js";

export default function Home() {
  return (
    <RecaptchaProvider>
      <Homepage />
    </RecaptchaProvider>
  );
}
