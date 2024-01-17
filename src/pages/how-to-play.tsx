import { Stack, Typography } from "@mui/material";
import React, { type FC } from "react";

import { text } from "~/assets/text";
import { BulletPoint, type BulletPointProps } from "~/components";
import { NumberedTextSection } from "~/components/numbered-text-section/index.js";
import { styles } from "~/styles/pages/how-to-play.js";
import { theme } from "~/styles/theme";

const HowToPlay: FC = () => {

  const NumberedSection = Object.entries(text.howToPlay.numberedSection).map(
    ([title, content], idx) => (
      <NumberedTextSection
        key={idx + 1}
        number={idx + 1}
        title={title}
        content={content.map((listElement, idxList) => {
          
          const props = {
            variant: "body1",
            text: listElement,
            sxContainer: styles.listElement,
          } as BulletPointProps;

          // two of the list items require specific styling hence the following ifs
          if (title === "chatting" && idxList === 3) {
            return (
              <BulletPoint key={idxList} {...props} sxText={{ color: theme.palette.secondary.main }} />
            );
          } else if (title === "results" && idxList === 2) {
            return (
              <BulletPoint key={idxList} {...props}>
                <Typography variant="body1">
                  <a href={text.howToPlay.link.connectingYourWallet.link}>
                    {text.howToPlay.link.connectingYourWallet.text}
                  </a>
                </Typography>
              </BulletPoint>
            );
          } else {
          return (
            <BulletPoint key={idxList} { ...props }/>
          );
        }})}
      />
    ),
  );
  return (
    <Stack sx={styles.container}>
      <Typography variant="h1" textAlign="center">
        {text.general.howToPlay}
      </Typography>
      <Typography variant="body1" textAlign="center" sx={styles.text}>
        {text.howToPlay.main[0]}
        <br />
        <br />
        {text.howToPlay.main[1]}
      </Typography>
      <Stack sx={styles.numberedListSection}>{NumberedSection}</Stack>      
    </Stack>
  );
};

export default HowToPlay;
