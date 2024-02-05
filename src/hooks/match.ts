import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { pages } from "~/router.js";
import { api } from "~/utils/api.js";

export const useRedirectIfPlayingMatch = () => {
  const router = useRouter();
  const fetching = useRef(false);

  const match = api.match.getOngoingMatch.useQuery(undefined, {
    retry: false,
  });

  useEffect(() => {
    const fetch = async () => {
      if (fetching.current) return;

      fetching.current = true;

      try {
        const res = await match.refetch({ throwOnError: true });

        await router.push({
          pathname: pages.match,
          query: { roomId: res.data!.id },
        });
      } catch (error) {}
    };

    void fetch();
  }, [match, router]);
};
