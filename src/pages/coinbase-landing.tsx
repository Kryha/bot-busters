import { TRPCError } from "@trpc/server";
import { useEffect, type FC, useState } from "react";
import { useRouter } from "next/router";

import { PageLayout } from "~/containers/page-layout/index.js";
import { text } from "~/assets/text/index.js";
import { LoadingPage } from "~/components/loading-page/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { bbLocalStorage } from "~/utils/local-storage.js";

const CoinbaseLanding: FC = () => {
  const router = useRouter();
  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });
  const storeUuid = api.coinbase.storeUuid.useMutation();
  const checkUuid = api.coinbase.checkUuid.useMutation();

  const [description, setDescription] = useState(
    text.landing.connectingCoinbase,
  );

  useEffect(() => {
    if (loggedUser.isLoading || !storeUuid.isIdle || !checkUuid.isIdle) return;

    const store = async () => {
      const { uuid } = router.query;

      if (typeof uuid === "string") {
        bbLocalStorage.removeItem("COINBASE_UUID");

        const isUuidLinked = await checkUuid.mutateAsync({
          coinbaseUuid: uuid,
        });

        if (isUuidLinked) {
          setDescription(text.landing.coinbaseAlreadyLinked);
        } else if (loggedUser.data) {
          await storeUuid.mutateAsync({ coinbaseUuid: uuid });
          await router.push(pages.home);
        } else {
          // store cb uuid in the local storage to be used later during account creation
          bbLocalStorage.setItem("COINBASE_UUID", uuid);
          await router.push(pages.home);
        }
      } else {
        await router.push(pages.home);
      }
    };

    store().catch((error) => {
      console.error("Error storing UUID:", error);

      if (error instanceof TRPCError && error.code === "FORBIDDEN") {
        setDescription(text.landing.coinbaseAlreadyLinked);
      } else {
        setDescription(text.landing.error);
      }
    });
  }, [checkUuid, loggedUser, router, storeUuid]);

  return (
    <PageLayout>
      <LoadingPage
        description={description}
        isLoading={storeUuid.isLoading || loggedUser.isLoading}
      />
    </PageLayout>
  );
};

export default CoinbaseLanding;
