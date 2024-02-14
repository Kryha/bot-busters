import {
  createContext,
  type FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { isClient } from "~/utils/client.js";
import {
  DEFAULT_MASTER_VOLUME,
  DEFAULT_MUSIC_VOLUME,
  DEFAULT_SFX_VOLUME,
} from "~/constants/index.js";

interface Context {
  mainContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  audioBuffers: React.MutableRefObject<Map<string, AudioBuffer>>;
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

export const SoundContextRef = createContext<Context | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}

export const SoundProvider: FC<Props> = ({ children }) => {
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext>();
  const [masterGainNode, setMasterGainNode] = useState<GainNode>();
  const [sfxGainNode, setSFXGainNode] = useState<GainNode>();
  const [musicGainNode, setMusicGainNode] = useState<GainNode>();

  const [masterVolume, setMasterVolume] = useState<number>(
    DEFAULT_MASTER_VOLUME,
  );
  const [sfxVolume, setSFXVolume] = useState<number>(DEFAULT_SFX_VOLUME);
  const [musicVolume, setMusicVolume] = useState<number>(DEFAULT_MUSIC_VOLUME);

  // Store for loaded audio buffers
  const audioBuffers = useRef<Map<string, AudioBuffer>>(new Map());

  useEffect(() => {
    if (isClient()) {
      const audioContext = new AudioContext();
      const masterGain = audioContext.createGain();
      const musicGain = audioContext.createGain();
      const sfxGain = audioContext.createGain();

      musicGain.connect(masterGain);
      sfxGain.connect(masterGain);
      masterGain.connect(audioContext.destination);

      setAudioContext(audioContext);
      setMasterGainNode(masterGain);
      setMusicGainNode(musicGain);
      setSFXGainNode(sfxGain);
    }
  }, []);

  useEffect(() => {
    if (mainContainerRef.current === null) return;
    const mainContainer = mainContainerRef.current;

    mainContainer.addEventListener("click", () => {
      if (audioContext && audioContext.state === "suspended") {
        void audioContext.resume();
      }
    });

    return () => {
      mainContainer.addEventListener("click", () => {
        if (audioContext && audioContext.state === "suspended") {
          void audioContext.resume();
        }
      });
    };
  }, [audioContext]);

  const contextValue = useMemo(
    () => ({
      mainContainerRef,
      audioBuffers,
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
      mainContainerRef,
      audioBuffers,
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
    <SoundContextRef.Provider value={contextValue}>
      {children}
    </SoundContextRef.Provider>
  );
};
