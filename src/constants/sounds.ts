export type MusicTrack = {
  trackId: string;
  url: string;
};

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
  | "Denied";

export const soundtracks: Record<TrackId, string> = {
  HomePage: "./music/botbusters-theme-song.mp3",
  MatchMaking: "./music/LonelyBot_Loop.mp3",
  MatchMakingOutro: "./music/LonelyBot_EndTag.mp3",
  GamePlay: "./music/BB_Game_Groove.mp3",
  GameDoubleTime: "./music/BB_Game_DoubleTime.mp3",
  GameDoubleTimeOutro: "./music/BB_Game_DoubleTime_Outro.mp3",
  Transition: "./music/Transition_Music.mp3",
  StartChatting: "./music/voice-overs/StartChating.mp3",
  LetsBustSomeBots: "./music/voice-overs/LetsBustSomeBots.mp3",
  BotBustedHeadPop: "./music/voice-overs/BotBusted_HeadPop.mp3",
  BotBusters: "./music/voice-overs/BotBusters.mp3",
  BotWins: "./music/voice-overs/BotWins.mp3",
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
};

//TODO: play randomly based on achievements
export const playerWin = {
  1: "./music/voice-overs/player-wins/Win_BeatItBots.mp3",
  2: "./music/voice-overs/player-wins/Win_BeepBoopBusted.mp3",
  3: "./music/voice-overs/player-wins/Win_GoodJob.mp3",
  4: "./music/voice-overs/player-wins/Win_Haha_WeGotEm.mp3",
  5: "./music/voice-overs/player-wins/Win_NothingButACalculator.mp3",
  6: "./music/voice-overs/player-wins/Win_NotInMyHouse.mp3",
  7: "./music/voice-overs/player-wins/Win_NowThatsWhatICall.mp3",
  8: "./music/voice-overs/player-wins/Win_RobotsSeeYaLater.mp3",
};

export const playerLose = {
  1: "./music/voice-overs/player-loses/Loss_BucketOfBolts.mp3",
  2: "./music/voice-overs/player-loses/Loss_IHateBots.mp3",
  3: "./music/voice-overs/player-loses/Loss_IKnewIt.mp3",
  4: "./music/voice-overs/player-loses/Loss_IKnewWeCoulntTrustThatOne.mp3",
  5: "./music/voice-overs/player-loses/Loss_MayNextTime.mp3",
  6: "./music/voice-overs/player-loses/Loss_NextTime.mp3",
  7: "./music/voice-overs/player-loses/Loss_Outsmarted.mp3",
  8: "./music/voice-overs/player-loses/Loss_StupidRobots.mp3",
  9: "./music/voice-overs/player-loses/Loss_TheyGotAway_01.mp3",
  10: "./music/voice-overs/player-loses/Loss_TheyGotAway_02.mp3",
  11: "./music/voice-overs/player-loses/Loss_TodayWereDefeated.mp3",
};
