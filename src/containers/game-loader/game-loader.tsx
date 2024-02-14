import { type FC, useEffect, useRef } from "react";
import { type MusicTrack, soundtracks } from "~/constants/sounds.js";
import { useAndRequireContext } from "~/hooks/use-and-require-context.js";
import { SoundContextRef } from "~/containers/sound-provider/index.js";

interface Props {
  children: React.ReactNode;
}

export const GameLoader: FC<Props> = ({ children }) => {
  const { audioContext, audioBuffers } = useAndRequireContext(
    SoundContextRef,
    "GameLoader",
    "sound-provider",
  );

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

    if (audioContext) {
      void loadMusicTracks(trackEntries);
    }
  }, [audioBuffers, audioContext, trackEntries]);

  return <>{children}</>;
};
