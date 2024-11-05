import { type FC } from "react";

import { PageLayout } from "~/containers/page-layout/index.js";
import { text } from "~/assets/text/index.js";
import { LoadingPage } from "~/components/loading-page/index.js";

const CoinbaseLanding: FC = () => {
  return (
    <PageLayout>
      <LoadingPage description={text.landing.connectingCoinbase} />
    </PageLayout>
  );
};

export default CoinbaseLanding;
