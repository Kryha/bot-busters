import React, { type FC } from "react";
import { Typography } from "@mui/material";

import { text as copywrite } from "~/assets/text/index.js";
import { BulletPoint, type BulletPointProps } from "~/components/index.js";
import { NumberedSection } from "~/components/numbered-text-section/index.js";
import { theme } from "~/styles/theme.js";
import { useRouter } from "next/router";
import { pages } from "~/router";

/**
 * How-to-play page section with static content
 * explaining the rules of Botbusters
 */
export const GameRules: FC = () => {
  const router = useRouter();

  return Object.entries(copywrite.howToPlay.numberedSection).map(
    ([title, content], idx) => (
      <NumberedSection
        key={idx + 1}
        number={idx + 1}
        title={title}
        content={content.map((listElement, idxList) => {
          const propsBulletPoint = {
            variant: "body1",
            text: listElement,
          } as BulletPointProps;
          // two of the list items require specific styling hence the following ifs
          if (title === "chatting" && idxList === 3) {
            return (
              <BulletPoint
                key={idxList}
                {...propsBulletPoint}
                sxText={{ color: theme.palette.secondary.main }}
              />
            );
          } else if (title === "results" && idxList === 2) {
            const { text, ...propsNoText } = propsBulletPoint;
            return (
              <BulletPoint key={idxList} {...propsNoText}>
                <Typography variant="body1">
                  {text}
                  <a onClick={() => void router.push(pages.login)}>
                    {copywrite.howToPlay.link.connectingYourWallet.text}
                  </a>
                </Typography>
              </BulletPoint>
            );
          } else {
            return <BulletPoint key={idxList} {...propsBulletPoint} />;
          }
        })}
      />
    ),
  );
};
