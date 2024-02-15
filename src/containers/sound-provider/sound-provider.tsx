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
import { type MusicTrack, soundtracks } from "~/constants/sounds";

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

export const ContextRef = createContext<Context | undefined>(undefined);
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

  const trackEntries = useRef(
    Object.entries(soundtracks).map(([trackId, url]) => ({
      trackId,
      url,
    })),
  ).current;

  useEffect(() => {
    const loadMusicTracks = async (tracks: MusicTrack[]) => {
      if (!audioContext) return;

      const loadTrack = async ({ trackId, url }: MusicTrack) => {
        try {
          const response = await fetch(url);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          audioBuffers.current.set(trackId, audioBuffer);
        } catch (decodeError) {
          console.error(
            `Error decoding audio data for track ${trackId}:`,
            decodeError,
          );
        }
      };

      try {
        await Promise.all(tracks.map(loadTrack));
      } catch (error) {
        console.error("Error loading all tracks", error);
      }
    };

    void loadMusicTracks(trackEntries);
  }, [audioBuffers, audioContext, trackEntries]);

  useEffect(() => {
    if (mainContainerRef.current) {
      const mainContainer = mainContainerRef.current;

      // Define the function that will be called on pointermove.
      const handlePointerMove = () => {
        if (audioContext && audioContext.state === "suspended") {
          void audioContext.resume();
        }
      };

      // Add the event listener.
      mainContainer.addEventListener("pointermove", handlePointerMove);

      // Return the cleanup function that removes the event listener.
      return () => {
        mainContainer.removeEventListener("pointermove", handlePointerMove);
      };
    }
  }, [audioContext, mainContainerRef]);

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
    <ContextRef.Provider value={contextValue}>{children}</ContextRef.Provider>
  );
};
