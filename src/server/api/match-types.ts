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

export interface Player {
  userId: string;
  score: number;
  isBot: boolean;
  isScoreSaved: boolean;
  botsBusted: number;
  votes: string[]; // array of voted ids
  chatNickname: string;
}

export type MatchStage = "chat" | "voting" | "results";

// TODO: don't send private data to client
export interface MatchRoom {
  players: Player[];
  stage: MatchStage;
  arePointsCalculated: boolean;
  createdAt: number; // unix timestamp
  votingAt: number; // unix timestamp
}

export type MatchEventType = "message" | "stageChange";
