import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Direction, Difficulty, Position } from '../types/game';
import { 
  getRandomFoodPosition, 
  getNextSnakeHead, 
  isCollision, 
  getGameSpeed, 
  calculateLevel,
  getOppositeDirection,
  GRID_SIZE
} from '../utils/gameUtils';

const initialGameState: GameState = {
  snake: [{ x: 15, y: 15 }], // Center position for larger grid
  food: { x: 10, y: 10 },
  direction: 'RIGHT',
  score: 0,
  level: 1,
  gameOver: false,
  paused: false,
  gameStarted: false
};

export const useSnakeGame = (difficulty: Difficulty, onFoodEaten: () => void, onGameOver: () => void) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const gameLoopRef = useRef<number>();
  const lastDirectionRef = useRef<Direction>('RIGHT');
  
  const startGame = useCallback(() => {
    const initialFood = getRandomFoodPosition(initialGameState.snake);
    setGameState({
      ...initialGameState,
      food: initialFood,
      gameStarted: true
    });
    lastDirectionRef.current = 'RIGHT';
  }, []);
  
  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      paused: !prev.paused
    }));
  }, []);
  
  const resetGame = useCallback(() => {
    setGameState(initialGameState);
    lastDirectionRef.current = 'RIGHT';
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  }, []);
  
  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prev => {
      // Prevent reversing into itself
      if (getOppositeDirection(newDirection) === lastDirectionRef.current) {
        return prev;
      }
      
      return {
        ...prev,
        direction: newDirection
      };
    });
  }, []);
  
  const gameLoop = useCallback(() => {
    setGameState(prev => {
      if (prev.gameOver || prev.paused || !prev.gameStarted) {
        return prev;
      }
      
      const head = prev.snake[0];
      const newHead = getNextSnakeHead(head, prev.direction);
      
      if (isCollision(newHead, prev.snake)) {
        onGameOver();
        return { ...prev, gameOver: true };
      }
      
      const newSnake = [newHead, ...prev.snake];
      let newFood = prev.food;
      let newScore = prev.score;
      
      // Check if food is eaten
      if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
        newScore += 10;
        newFood = getRandomFoodPosition(newSnake);
        onFoodEaten();
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }
      
      const newLevel = calculateLevel(newScore);
      lastDirectionRef.current = prev.direction;
      
      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        score: newScore,
        level: newLevel
      };
    });
  }, [onFoodEaten, onGameOver]);
  
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver || gameState.paused) {
      return;
    }
    
    const speed = getGameSpeed(gameState.level, difficulty);
    const intervalId = setInterval(gameLoop, speed);
    
    return () => clearInterval(intervalId);
  }, [gameState.gameStarted, gameState.gameOver, gameState.paused, gameState.level, difficulty, gameLoop]);
  
  return {
    gameState,
    startGame,
    pauseGame,
    resetGame,
    changeDirection
  };
};