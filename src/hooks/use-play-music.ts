import { useCallback } from "react";
import { ContextRef } from "~/containers/sound-provider/index.js";
import { useAndRequireContext } from "~/hooks/use-and-require-context.js";

export const usePlayMusic = () => {
  const { audioContext, masterGainNode, musicGainNode } = useAndRequireContext(
    ContextRef,
    "usePlayMusic",
    "sound-provider",
  );
  return useCallback(
    async (audioFile: string, loop?: boolean) => {
      if (!audioContext || !masterGainNode || !musicGainNode) {
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
            source.connect(musicGainNode);
            musicGainNode.connect(masterGainNode);
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
    [audioContext, masterGainNode, musicGainNode],
  );
};
