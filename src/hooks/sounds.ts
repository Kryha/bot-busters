import { useCallback, useEffect, useState } from "react";
import { ContextRef } from "~/containers/sound-provider/index.js";
import { useAndRequireContext } from "~/hooks/use-and-require-context.js";

export const usePlayMusic = () => {
  const { audioContext, masterGainNode, musicGainNode } = useAndRequireContext(
    ContextRef,
    "usePlayMusic",
    "sound-provider",
  );

  const [source, setSource] = useState<AudioBufferSourceNode | null>(null);

  const playMusic = useCallback(
    async (audioFile: string, loop?: boolean) => {
      if (!audioContext || !masterGainNode || !musicGainNode) {
        return;
      }

      // Stop currently playing music if any
      if (source) {
        source.stop();
        setSource(null);
      }

      try {
        const response = await fetch(audioFile);
        const arrayBuffer = await response.arrayBuffer();
        await audioContext.decodeAudioData(
          arrayBuffer,
          (audioBuffer) => {
            const newSource = audioContext.createBufferSource();
            newSource.buffer = audioBuffer;
            newSource.loop = !!loop;
            newSource.connect(musicGainNode);
            musicGainNode.connect(masterGainNode);
            masterGainNode.connect(audioContext.destination);
            newSource.start(audioContext.currentTime);
            setSource(newSource);
          },
          (error) => {
            console.error("Error decoding audio:", error);
          },
        );
      } catch (error) {
        console.error("Error playing sound: ", error);
      }
    },
    [audioContext, masterGainNode, musicGainNode, source],
  );

  // Function to stop the music
  const stopMusic = useCallback(() => {
    if (source) {
      source.stop();
      setSource(null); // Ensure to clear the source after stopping
    }
  }, [source]);

  // Ensure to clean up when the component using this hook unmounts or the source changes
  useEffect(() => {
    return () => {
      if (source) {
        source.disconnect(); // Disconnect the source on cleanup
        setSource(null);
      }
    };
  }, [source]);

  return { playMusic, stopMusic, audioContext };
};

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
            source.start(audioContext.currentTime);
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
