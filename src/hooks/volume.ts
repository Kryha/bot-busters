import { useEffect } from "react";
import { useAndRequireContext } from "~/hooks/use-and-require-context.js";
import { ContextRef } from "~/containers/sound-provider/index.js";
import { isClient } from "~/utils/client.js";
import {
  DEFAULT_MASTER_VOLUME,
  DEFAULT_MUSIC_VOLUME,
  DEFAULT_SFX_VOLUME,
} from "~/constants/index.js";
import { bbLocalStorage } from "~/utils/local-storage.js";

export const useChangeMasterVolume = () => {
  const { audioContext, masterGainNode, masterVolume, setMasterVolume } =
    useAndRequireContext(ContextRef, "useChangeMasterVolume", "sound-provider");

  useEffect(() => {
    if (!isClient() || !audioContext || !masterGainNode) {
      return;
    }
    const storedMasterVolume = bbLocalStorage.getItem("MASTER_VOLUME");
    const value =
      storedMasterVolume !== null
        ? Number(storedMasterVolume)
        : DEFAULT_MASTER_VOLUME;

    setMasterVolume(value);
    masterGainNode.gain.setValueAtTime(masterVolume, audioContext.currentTime);
    masterGainNode.connect(audioContext.destination);
  }, [audioContext, masterGainNode, masterVolume, setMasterVolume]);

  const changeMasterVolume = (volume: number) => {
    isClient() && bbLocalStorage.setItem("MASTER_VOLUME", String(volume));
    setMasterVolume(volume);
  };

  return { changeMasterVolume, masterVolume };
};

export const useChangeSFXVolume = () => {
  const { masterGainNode, sfxGainNode, sfxVolume, setSFXVolume } =
    useAndRequireContext(ContextRef, "useChangeSFXVolume", "sound-provider");

  useEffect(() => {
    if (!isClient() || !masterGainNode || !sfxGainNode) {
      return;
    }
    const storedSFXVolume = bbLocalStorage.getItem("SFX_VOLUME");
    const value =
      storedSFXVolume !== null ? Number(storedSFXVolume) : DEFAULT_SFX_VOLUME;
    setSFXVolume(value);
    sfxGainNode.gain.setValueAtTime(sfxVolume, 0);
    sfxGainNode.connect(masterGainNode);
  }, [masterGainNode, setSFXVolume, sfxGainNode, sfxVolume]);

  const changeSFXVolume = (volume: number) => {
    isClient() && bbLocalStorage.setItem("SFX_VOLUME", String(volume));
    setSFXVolume(volume);
  };

  return { changeSFXVolume, sfxVolume };
};

export const useChangeMusicVolume = () => {
  const { masterGainNode, musicGainNode, musicVolume, setMusicVolume } =
    useAndRequireContext(ContextRef, "useChangeMusicVolume", "sound-provider");

  useEffect(() => {
    if (!isClient() || !masterGainNode || !musicGainNode) {
      return;
    }
    const storedMusicVolume = bbLocalStorage.getItem("MUSIC_VOLUME");
    const value =
      storedMusicVolume !== null
        ? Number(storedMusicVolume)
        : DEFAULT_MUSIC_VOLUME;
    setMusicVolume(value);
    musicGainNode.gain.setValueAtTime(musicVolume, 0);
    musicGainNode.connect(masterGainNode);
  }, [masterGainNode, musicGainNode, musicVolume, setMusicVolume]);

  const changeMusicVolume = (volume: number) => {
    isClient() && bbLocalStorage.setItem("MUSIC_VOLUME", String(volume));
    setMusicVolume(volume);
  };

  return { changeMusicVolume, musicVolume };
};
