export type MusicTrack = {
  trackId: string;
  url: string;
};

export const BOTBUSTED_TIME_MS = 5000;
export const RESULTS_SFX_TIME_MS = 12000;

export type TrackId =
  | "HomePage"
  | "MatchMaking"
  | "MatchMakingOutro"
  | "GamePlay"
  | "GameDoubleTime"
  | "GameDoubleTimeOutro"
  | "Transition"
  | "StartChatting"
  | "LetsBustSomeBots"
  | "PlayButton"
  | "NavClick"
  | "BotBustedHeadPop"
  | "BotBusters"
  | "BotWins"
  | "Blip"
  | "BlipUp"
  | "BlipDown"
  | "BlipSelection"
  | "Texting"
  | "TextSent"
  | "TextReceived"
  | "Bonus"
  | "Denied"
  | "Win1"
  | "Win2"
  | "Win3"
  | "Win4"
  | "Win5"
  | "Win6"
  | "Win7"
  | "Win8"
  | "Lose1"
  | "Lose2"
  | "Lose3"
  | "Lose4"
  | "Lose5"
  | "Lose6"
  | "Lose7"
  | "Lose8"
  | "Lose9"
  | "Lose10"
  | "Lose11";

export const soundtracks: Record<TrackId, string> = {
  HomePage: "./music/BotBusters_Theme_Instrumental.mp3",
  MatchMaking: "./music/LonelyBot_Loop.mp3",
  MatchMakingOutro: "./music/LonelyBot_EndTag.mp3",
  GamePlay: "./music/BB_Game_Groove.mp3",
  GameDoubleTime: "./music/BB_Game_DoubleTime.mp3",
  GameDoubleTimeOutro: "./music/BB_Game_DoubleTime_Outro.mp3",
  Transition: "./music/Transition_Music.mp3",
  StartChatting: "./music/voice-over/StartChating.mp3",
  LetsBustSomeBots: "./music/voice-over/LetsBustSomeBots.mp3",
  BotBustedHeadPop: "./music/voice-over/BotBusted_HeadPop.mp3",
  BotBusters: "./music/voice-over/BotBusters.mp3",
  BotWins: "./music/voice-over/BotWins.mp3",
  PlayButton: "./sounds/BB_UI_Play.mp3",
  NavClick: "./sounds/BB_UI_Nav_Click.mp3",
  Blip: "./sounds/BB_UI_Blip.mp3",
  BlipUp: "./sounds/BB_UI_Blip_Up.mp3",
  BlipDown: "./sounds/BB_UI_Blip_Down.mp3",
  BlipSelection: "./sounds/BB_UI_Blip_Selection.mp3",
  Texting: "./sounds/BB_UI_Texting.mp3",
  TextSent: "./sounds/BB_UI_TextSent.mp3",
  TextReceived: "./sounds/BB_UI_TextRecieved.mp3",
  Bonus: "./sounds/BB_UI_Bonus.mp3",
  Denied: "./sounds/BB_UI_Denied.mp3",
  Win1: "./music/voice-over/player-wins/Win_BeatItBots.mp3",
  Win2: "./music/voice-over/player-wins/Win_BeepBoopBusted.mp3",
  Win3: "./music/voice-over/player-wins/Win_GoodJob.mp3",
  Win4: "./music/voice-over/player-wins/Win_Haha_WeGotEm.mp3",
  Win5: "./music/voice-over/player-wins/Win_NothingButACalculator.mp3",
  Win6: "./music/voice-over/player-wins/Win_NotInMyHouse.mp3",
  Win7: "./music/voice-over/player-wins/Win_NowThatsWhatICall.mp3",
  Win8: "./music/voice-over/player-wins/Win_RobotsSeeYaLater.mp3",
  Lose1: "./music/voice-over/player-loses/Loss_BucketOfBolts.mp3",
  Lose2: "./music/voice-over/player-loses/Loss_IHateBots.mp3",
  Lose3: "./music/voice-over/player-loses/Loss_IKnewIt.mp3",
  Lose4: "./music/voice-over/player-loses/Loss_IKnewWeCoulntTrustThatOne.mp3",
  Lose5: "./music/voice-over/player-loses/Loss_MayNextTime.mp3",
  Lose6: "./music/voice-over/player-loses/Loss_NextTime.mp3",
  Lose7: "./music/voice-over/player-loses/Loss_Outsmarted.mp3",
  Lose8: "./music/voice-over/player-loses/Loss_StupidRobots.mp3",
  Lose9: "./music/voice-over/player-loses/Loss_TheyGotAway_01.mp3",
  Lose10: "./music/voice-over/player-loses/Loss_TheyGotAway_02.mp3",
  Lose11: "./music/voice-over/player-loses/Loss_TodayWereDefeated.mp3",
};

// We use these tracks to play a random track when the player wins or loses

export const WinTracks: TrackId[] = [
  "Win1",
  "Win2",
  "Win3",
  "Win4",
  "Win5",
  "Win6",
  "Win7",
  "Win8",
];

export const LosesTracks: TrackId[] = [
  "Lose1",
  "Lose2",
  "Lose3",
  "Lose4",
  "Lose5",
  "Lose6",
  "Lose7",
  "Lose8",
  "Lose9",
  "Lose10",
  "Lose11",
];

export const getWinTrack = (): TrackId => {
  const randomIndex = Math.floor(Math.random() * WinTracks.length);
  return WinTracks[randomIndex]!;
};

export const getLoseTrack = (): TrackId => {
  const randomIndex = Math.floor(Math.random() * LosesTracks.length);
  return LosesTracks[randomIndex]!;
};
