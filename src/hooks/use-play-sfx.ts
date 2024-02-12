import { useCallback } from "react";
import { useAndRequireContext } from "~/hooks/use-and-require-context.js";
import { ContextRef } from "~/containers/sound-provider/index.js";

export const usePlaySFX = () => {
  const { audioContext, masterGainNode, sfxGainNode } = useAndRequireContext(
    ContextRef,
    "usePlaySFX",
    "sound-provider",
  );

  return useCallback(
    async (audioFile: string, loop?: boolean) => {
      if (!audioContext || !masterGainNode || !sfxGainNode) {
        return;
      }
      try {
        const response = await fetch(audioFile);
        const arrayBuffer = await response.arrayBuffer();
        await audioContext.decodeAudioData(
          arrayBuffer,
          (audioBuffer) => {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.loop = !!loop;
            source.connect(sfxGainNode);
            sfxGainNode.connect(masterGainNode);
            masterGainNode.connect(audioContext.destination);
            source.start(0);
          },
          (e) => {
            console.error("Error decoding audio:", e);
          },
        );
      } catch (error) {
        console.error("Error playing sound: ", error);
      }
    },
    [audioContext, masterGainNode, sfxGainNode],
  );
};
