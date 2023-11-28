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
  characterId: number;
  score: number;
  isBot: boolean;
  isScoreSaved: boolean;
  // TODO: add `votes` and `chatNickname` fields
}

// TODO: add record of votes after implementing voting mechanism and distinguishing between bots and humans
export interface ChatRoom {
  players: Player[];
  stage: "chat" | "voting" | "results";
  createdAt: number; // unix timestamp
  votingAt: number; // unix timestamp
}

export type ChatEventType = "message" | "timeout" | "stageChange";

export interface StagePayload {
  stage: "chat" | "voting" | "results";
}
