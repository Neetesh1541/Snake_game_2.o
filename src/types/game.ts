export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  level: number;
  gameOver: boolean;
  paused: boolean;
  gameStarted: boolean;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameSettings {
  gridSize: number;
  difficulty: Difficulty;
  audioEnabled: boolean;
  theme: 'light' | 'dark';
}

export interface LeaderboardEntry {
  score: number;
  level: number;
  date: string;
  difficulty: Difficulty;
}