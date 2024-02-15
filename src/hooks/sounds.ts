import { useCallback, useEffect, useRef } from "react";
import { type MatchStage } from "~/types/index.js";
import { type TrackId } from "~/constants/sounds.js";
import { ContextRef } from "~/containers/sound-provider/index.js";
import { useAndRequireContext } from "~/hooks/use-and-require-context.js";
import { useRouter } from "next/router.js";

export const usePlayMusic = (
  audioFile: TrackId,
  loop: boolean,
  pathname: string,
  delayInSeconds = 0,
  stage?: MatchStage,
  definedStage?: MatchStage,
) => {
  const { audioContext, audioBuffers, masterGainNode, musicGainNode } =
    useAndRequireContext(ContextRef, "usePlayMusic", "sound-provider");

  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const router = useRouter();

  useEffect(() => {
    const playAudio = () => {
      if (!audioContext || !masterGainNode || !musicGainNode) return;

      void audioContext.resume();
      const audioBuffer = audioBuffers.current.get(audioFile);

      if (audioBuffer) {
        const sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.loop = loop;
        sourceNode.connect(musicGainNode);
        musicGainNode.connect(masterGainNode);
        masterGainNode.connect(audioContext.destination);
        sourceNode.start(audioContext.currentTime + delayInSeconds);
        sourceNodeRef.current = sourceNode;
      }
    };

    // Function to stop the music
    const stopAudio = () => {
      sourceNodeRef.current?.stop();
      sourceNodeRef.current = null;
    };

    if (router.pathname === pathname) {
      if (stage === definedStage) {
        playAudio();
      }
    } else {
      stopAudio();
    }

    return () => stopAudio();
  }, [
    audioBuffers,
    audioContext,
    audioFile,
    definedStage,
    delayInSeconds,
    loop,
    masterGainNode,
    musicGainNode,
    pathname,
    router.pathname,
    stage,
  ]);
};

export const usePlaySFX = () => {
  const { audioContext, audioBuffers, masterGainNode, sfxGainNode } =
    useAndRequireContext(ContextRef, "usePlaySFX", "sound-provider");

  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  return useCallback(
    (audioFile: TrackId, loop?: boolean) => {
      if (!audioContext || !masterGainNode || !sfxGainNode) return;
      const audioBuffer = audioBuffers.current.get(audioFile);

      if (audioBuffer) {
        const sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.loop = !!loop;
        sourceNode.connect(sfxGainNode);
        sfxGainNode.connect(masterGainNode);
        masterGainNode.connect(audioContext.destination);
        sourceNode.start(audioContext.currentTime);
        sourceNodeRef.current = sourceNode;
      }
    },
    [audioBuffers, audioContext, masterGainNode, sfxGainNode],
  );
};
