import { createContext, type FC, useEffect, useMemo, useState } from "react";
import { DEFAULT_VOLUME } from "~/constants/index.js";

interface Context {
  audioContext?: AudioContext;
  masterGainNode?: GainNode;
  musicGainNode?: GainNode;
  sfxGainNode?: GainNode;
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  setMasterVolume: (volume: number) => void;
  setSFXVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
}

export const ContextRef = createContext<Context | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}

export const SoundProvider: FC<Props> = ({ children }) => {
  const [audioContext, setAudioContext] = useState<AudioContext>();
  const [masterGainNode, setMasterGainNode] = useState<GainNode>();
  const [sfxGainNode, setSFXGainNode] = useState<GainNode>();
  const [musicGainNode, setMusicGainNode] = useState<GainNode>();
  const [masterVolume, setMasterVolume] = useState<number>(DEFAULT_VOLUME);
  const [sfxVolume, setSFXVolume] = useState<number>(DEFAULT_VOLUME);
  const [musicVolume, setMusicVolume] = useState<number>(DEFAULT_VOLUME);

  useEffect(() => {
    const initializeAudioContext = () => {
      const audioContext = new AudioContext();
      const masterGainNode = audioContext.createGain();
      const musicGainNode = audioContext.createGain();
      const sfxGainNode = audioContext.createGain();
      musicGainNode.connect(masterGainNode);
      sfxGainNode.connect(masterGainNode);
      masterGainNode.connect(audioContext.destination);
      setAudioContext(audioContext);
      setMasterGainNode(masterGainNode);
      setMusicGainNode(musicGainNode);
      setSFXGainNode(sfxGainNode);
    };

    if (!audioContext) {
      initializeAudioContext();
    }
  }, [audioContext]);

  const contextValue = useMemo(
    () => ({
      audioContext,
      masterGainNode,
      musicGainNode,
      sfxGainNode,
      masterVolume,
      sfxVolume,
      musicVolume,
      setMasterVolume,
      setSFXVolume,
      setMusicVolume,
    }),
    [
      audioContext,
      masterGainNode,
      musicGainNode,
      sfxGainNode,
      masterVolume,
      sfxVolume,
      musicVolume,
    ],
  );

  return (
    <ContextRef.Provider value={contextValue}>{children}</ContextRef.Provider>
  );
};
