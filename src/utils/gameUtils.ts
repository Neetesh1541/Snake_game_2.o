import { Position, Direction, Difficulty } from '../types/game';

export const GRID_SIZE = 30; // Increased from 20 to 30 for larger game area

export const getRandomFoodPosition = (snake: Position[]): Position => {
  let newFood: Position;
  
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  
  return newFood;
};

export const getNextSnakeHead = (head: Position, direction: Direction): Position => {
  switch (direction) {
    case 'UP':
      return { x: head.x, y: head.y - 1 };
    case 'DOWN':
      return { x: head.x, y: head.y + 1 };
    case 'LEFT':
      return { x: head.x - 1, y: head.y };
    case 'RIGHT':
      return { x: head.x + 1, y: head.y };
  }
};

export const isCollision = (head: Position, snake: Position[]): boolean => {
  // Wall collision
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }
  
  // Self collision
  return snake.some(segment => segment.x === head.x && segment.y === head.y);
};

export const getGameSpeed = (level: number, difficulty: Difficulty): number => {
  const baseSpeed = {
    easy: 200,
    medium: 150,
    hard: 100
  }[difficulty];
  
  return Math.max(baseSpeed - (level - 1) * 10, 50);
};

export const calculateLevel = (score: number): number => {
  return Math.floor(score / 10) + 1;
};

export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case 'UP': return 'DOWN';
    case 'DOWN': return 'UP';
    case 'LEFT': return 'RIGHT';
    case 'RIGHT': return 'LEFT';
  }
};

export const formatScore = (score: number): string => {
  return score.toString().padStart(4, '0');
};

export const saveToLeaderboard = (score: number, level: number, difficulty: Difficulty): void => {
  const leaderboard = getLeaderboard();
  const newEntry = {
    score,
    level,
    date: new Date().toISOString(),
    difficulty
  };
  
  leaderboard.push(newEntry);
  leaderboard.sort((a, b) => b.score - a.score);
  
  // Keep only top 10 scores
  const topScores = leaderboard.slice(0, 10);
  localStorage.setItem('snakeGameLeaderboard', JSON.stringify(topScores));
};

export const getLeaderboard = (): any[] => {
  const stored = localStorage.getItem('snakeGameLeaderboard');
  return stored ? JSON.parse(stored) : [];
};