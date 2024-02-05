import { text } from "~/assets/text/index.js";
import { PageHeader } from "~/containers/page-header/index.js";
import { useRedirectIfPlayingMatch } from "~/hooks/match.js";

function Privacy() {
  useRedirectIfPlayingMatch();

  // TODO: update page
  return <PageHeader text={text.general.privacy} />;
}

export default Privacy;
