import { useEffect } from "react";
import { useAndRequireContext } from "~/hooks/use-and-require-context.js";
import { SoundContextRef } from "~/containers/sound-provider/index.js";
import { isClient } from "~/utils/client.js";
import {
  DEFAULT_MASTER_VOLUME,
  DEFAULT_MUSIC_VOLUME,
  DEFAULT_SFX_VOLUME,
} from "~/constants/index.js";

export const useChangeMasterVolume = () => {
  const { audioContext, masterGainNode, masterVolume, setMasterVolume } =
    useAndRequireContext(
      SoundContextRef,
      "useChangeMasterVolume",
      "sound-provider",
    );

  useEffect(() => {
    if (!isClient() || !audioContext || !masterGainNode) {
      return;
    }
    const storedMasterVolume = localStorage.getItem("MASTER_VOLUME");
    const value =
      storedMasterVolume !== null
        ? Number(storedMasterVolume)
        : DEFAULT_MASTER_VOLUME;

    setMasterVolume(value);
    masterGainNode.gain.setValueAtTime(Number(masterVolume), 0);
    masterGainNode.connect(audioContext.destination);
  }, [masterVolume, audioContext, masterGainNode, setMasterVolume]);

  const changeMasterVolume = (volume: number) => {
    isClient() && localStorage.setItem("MASTER_VOLUME", String(volume));
    setMasterVolume(volume);
  };

  return { changeMasterVolume, masterVolume };
};

export const useChangeSFXVolume = () => {
  const { masterGainNode, sfxGainNode, sfxVolume, setSFXVolume } =
    useAndRequireContext(
      SoundContextRef,
      "useChangeSFXVolume",
      "sound-provider",
    );

  useEffect(() => {
    if (!isClient() || !masterGainNode || !sfxGainNode) {
      return;
    }
    const storedSFXVolume = localStorage.getItem("SFX_VOLUME");
    const value =
      storedSFXVolume !== null ? Number(storedSFXVolume) : DEFAULT_SFX_VOLUME;
    setSFXVolume(value);
    sfxGainNode.gain.setValueAtTime(Number(sfxVolume), 0);
    sfxGainNode.connect(masterGainNode);
  }, [sfxVolume, masterGainNode, sfxGainNode, setSFXVolume]);

  const changeSFXVolume = (volume: number) => {
    isClient() && localStorage.setItem("SFX_VOLUME", String(volume));
    setSFXVolume(volume);
  };

  return { changeSFXVolume, sfxVolume };
};

export const useChangeMusicVolume = () => {
  const { masterGainNode, musicGainNode, musicVolume, setMusicVolume } =
    useAndRequireContext(
      SoundContextRef,
      "useChangeMusicVolume",
      "sound-provider",
    );

  useEffect(() => {
    if (!masterGainNode || !musicGainNode) {
      return;
    }
    const storedMusicVolume = localStorage.getItem("MUSIC_VOLUME");
    const value =
      storedMusicVolume !== null
        ? Number(storedMusicVolume)
        : DEFAULT_MUSIC_VOLUME;
    setMusicVolume(value);
    musicGainNode.gain.setValueAtTime(Number(musicVolume), 0);
    musicGainNode.connect(masterGainNode);
  }, [musicVolume, masterGainNode, musicGainNode, setMusicVolume]);

  const changeMusicVolume = (volume: number) => {
    isClient() && localStorage.setItem("MUSIC_VOLUME", String(volume));
    setMusicVolume(volume);
  };

  return { changeMusicVolume, musicVolume };
};
