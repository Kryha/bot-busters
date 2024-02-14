import { useCallback, useEffect, useRef } from "react";
import { type MatchStage } from "~/types/index.js";
import { type TrackId } from "~/constants/sounds.js";
import { SoundContextRef } from "~/containers/sound-provider/index.js";
import { useAndRequireContext } from "~/hooks/use-and-require-context.js";
import { useRouter } from "next/router.js";

export const usePlayMusic = (
  audioFile: TrackId,
  loop?: boolean,
  pathname?: string,
  delayInSeconds = 0,
  stage?: MatchStage,
  definedStage?: MatchStage,
  offset?: number,
  duration?: number,
) => {
  const { audioContext, audioBuffers, masterGainNode, musicGainNode } =
    useAndRequireContext(SoundContextRef, "usePlayMusic", "sound-provider");

  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const router = useRouter();

  useEffect(() => {
    const playAudio = () => {
      if (!audioContext || !masterGainNode || !musicGainNode) return;
      const audioBuffer = audioBuffers.current.get(audioFile);
      if (audioBuffer) {
        const sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.loop = !!loop;
        sourceNode.connect(musicGainNode);
        musicGainNode.connect(masterGainNode);
        masterGainNode.connect(audioContext.destination);
        sourceNode.start(
          audioContext.currentTime + delayInSeconds,
          offset,
          duration,
        );
        sourceNodeRef.current = sourceNode;
      }
    };

    // Function to stop the music
    const stopAudio = () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current = null;
      }
    };

    router.pathname === pathname || stage === definedStage
      ? playAudio()
      : stopAudio();

    return () => stopAudio();
  }, [
    audioBuffers,
    audioContext,
    audioFile,
    definedStage,
    delayInSeconds,
    duration,
    loop,
    masterGainNode,
    musicGainNode,
    offset,
    pathname,
    router.pathname,
    stage,
  ]);
};

export const usePlaySFX = () => {
  const { audioContext, audioBuffers, masterGainNode, sfxGainNode } =
    useAndRequireContext(SoundContextRef, "usePlaySFX", "sound-provider");

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
