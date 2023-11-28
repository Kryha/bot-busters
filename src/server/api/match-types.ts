export interface ReadyToPlayPayload {
  players: string[];
  roomId: string;
}

export interface QueueUpdatePayload {
  playerQueuePosition: number;
  queueLength: number;
}

export interface ChatMessagePayload {
  sender: string;
  message: string;
  sentAt: number; // unix time
}

export interface Character {
  id: number;
  characterName: string;
  color: string;
}
export interface Player {
  userId: string;
  chatNickname: string;
  color: string;
  score: number;
  isBot?: boolean;
  isScoreSaved: boolean;
  botsBusted: number;
  correctGuesses: number;
  votes: string[]; // array of voted ids
}

export type MatchStage = "chat" | "voting" | "results";

export interface MatchRoom {
  players: Player[];
  stage: MatchStage;
  arePointsCalculated: boolean;
  arePointsSaved: boolean;
  createdAt: number; // unix timestamp
  votingAt: number; // unix timestamp
}

export type MatchEventType = "message" | "stageChange";
